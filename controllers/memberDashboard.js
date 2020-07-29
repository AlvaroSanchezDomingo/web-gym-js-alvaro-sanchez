'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');

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
};

module.exports = memberDashboard;