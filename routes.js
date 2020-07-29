"use strict";

const express = require("express");
const router = express.Router();

const trainerDashboard = require("./controllers/trainerDashboard.js");
const memberDashboard = require("./controllers/memberDashboard.js");
const about = require("./controllers/about.js");

router.get("/", about.index);
router.get("/about", about.index);
router.get("/trainer", trainerDashboard.index);
router.get('/member/:id', memberDashboard.index);
router.get('/member/:id/deleteassessment/:assessmentid', memberDashboard.deleteAssessment);


module.exports = router;
