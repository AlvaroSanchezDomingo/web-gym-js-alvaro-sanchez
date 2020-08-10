'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const uuid = require('uuid');

const memberDashboard = {
  index(request, response) {
    const memberId = request.params.id;
    const viewData = {
      title: 'Member Data',
      member: memberStore.getMember(memberId),
    };
    response.render('memberDashboard', viewData);
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
    };
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
};

module.exports = memberDashboard;