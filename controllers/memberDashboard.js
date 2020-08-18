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
    const newAssessment = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      comment: 'No comment yet',
    };
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
};

module.exports = memberDashboard;