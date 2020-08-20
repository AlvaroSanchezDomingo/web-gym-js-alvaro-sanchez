'use strict';

const logger = require('../utils/logger');
const utility = require('../utils/utility');
const memberStore = require('../models/member-store.js');
const trainerStore = require('../models/trainer-store.js');


const uuid = require('uuid');

const memberDashboard = {
  index(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const cookieEmail = request.cookies.webgym;
    const viewData = {
      title: 'Member Data',
      member: member,
      statistics:utility.MemberStats(member),
    };
    if (memberStore.getMemberByEmail(cookieEmail)){
      response.render('memberDashboard', viewData);
    }else if(trainerStore.getTrainerByEmail(cookieEmail)){
      response.render('memberDashboard-trainer', viewData);
    }else{
      response.render('/', viewData);
    }
    
  },
  displayCurrent(request, response) {
    const memberEmail = request.cookies.webgym;
    const member = memberStore.getMemberByEmail(memberEmail);
    response.redirect('/member/' + member.id);
  },
   deleteAssessment(request, response) {
    const membertId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${membertId}`);
    memberStore.removeAssessment(membertId, assessmentId);
    response.redirect('/member/' + membertId);
  },
  addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    let trend;
    if(member.assessments.length>1){
      trend= request.body.weight < member.assessments[member.assessments.length-1].weight;
    }else{
      trend= request.body.weight < member.startingWeight;
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'-'+dd+'-'+yyyy;
    const newAssessment = {
      id: uuid.v1(),
      date:today,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend: trend,
      comment: 'No comment yet',
    };
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
  addGoal(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'-'+dd+'-'+yyyy;
    const newGoal = {
      id: uuid.v1(),
      date:today,
      measurement: request.body.measurement,
      status: 'Open',
    };
    memberStore.addGoal(memberId, newGoal);
    response.redirect('/member/' + memberId);
  },
  missedGoal(request, response){
    const membertId = request.params.id;
    const assessmentId = request.params.goalid;
    let member = memberStore.getMember(membertId);
    let index = -1;
    for (let i=0; i<member.goals.length;i +=1){
      if(member.goals[i].id=== assessmentId) {
            index = i;
            break;
        }
    }
    member.goals[index].status='Missed';
    memberStore.updateMember(member);
    response.redirect('/member/' + membertId);
  },
};

module.exports = memberDashboard;