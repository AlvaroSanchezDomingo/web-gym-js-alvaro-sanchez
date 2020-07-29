"use strict";

const logger = require("../utils/logger");
const memberStore = require('../models/member-store.js');

const trainerDashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      members:memberStore.getAllMembers(),
    };
    response.render("trainerDashboard", viewData);
  },
};

module.exports = trainerDashboard;