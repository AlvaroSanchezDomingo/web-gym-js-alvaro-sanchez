"use strict";

const logger = require("../utils/logger");
const members = require('../models/member-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      member:members[1],
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
