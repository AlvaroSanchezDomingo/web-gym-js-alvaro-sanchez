"use strict";

const logger = require("../utils/logger");
const memberStore = require('../models/member-store.js');
const uuid = require('uuid');

const trainerDashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      members:memberStore.getAllMembers(),
    };
    response.render("trainerDashboard", viewData);
  },
  deleteMember(request, response) {
    const membertId = request.params.id;
    logger.debug(`Deleting Member ${membertId}`);
    memberStore.removeMember(membertId);
    response.redirect('/trainer');
  },
  addMember(request, response) {
    const newMember = {
      id: uuid.v1(),
      name: request.body.name,
      assessments: [],
    };
    memberStore.addMember(newMember);
    response.redirect('/trainer');
  },
};

module.exports = trainerDashboard;