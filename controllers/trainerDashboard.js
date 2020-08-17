"use strict";

const logger = require("../utils/logger");
const memberStore = require('../models/member-store.js');
const trainerStore = require('../models/trainer-store.js');
const uuid = require('uuid');

const trainerDashboard = {
  index(request, response) {
    const trainerId = request.params.id;
    const trainer = trainerStore.getTrainer(trainerId);
    logger.info("dashboard rendering");
    const viewData = {
      members:memberStore.getAllMembers(),
      trainer:trainer,
    };
    response.render("trainerDashboard", viewData);
  },
  displayCurrent(request, response) {
    const trainerEmail = request.cookies.webgym;
    const trainer = trainerStore.getTrainerByEmail(trainerEmail);
    response.redirect('/trainer/' + trainer.id);
  },
  
  deleteMember(request, response) {
    const membertId = request.params.id;
    logger.debug(`Deleting Member ${membertId}`);
    memberStore.removeMember(membertId);
    response.redirect('/trainer');
  },
  editComment(request, response) {
    const membertId = request.params.id;
    const assessmentId = request.params.assessmentid;
    let member = memberStore.getMember(membertId);
    let index = -1;
    for (let i=0; i<member.assessments.length;i +=1){
      if(member.assessments[i].id=== assessmentId) {
            index = i;
            break;
        }
    }
    member.assessments[index].comment=request.body.comment;
    logger.info(`update comment to ${index}`);
    memberStore.updateMember(member);
    response.redirect('/member/' + membertId);
  },
};

module.exports = trainerDashboard;