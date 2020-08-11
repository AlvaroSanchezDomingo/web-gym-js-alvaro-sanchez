"use strict";

const express = require("express");
const router = express.Router();

const trainerDashboard = require("./controllers/trainerDashboard.js");
const memberDashboard = require("./controllers/memberDashboard.js");
const about = require("./controllers/about.js");
const accounts = require('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/about", about.index);
router.get("/trainer", trainerDashboard.index);
router.get("/trainer/deletemember/:id", trainerDashboard.deleteMember);
router.post('/trainer/addmember', trainerDashboard.addMember);//##############################################delete this later

router.get('/member/:id', memberDashboard.index);
router.get('/member/:id/deleteassessment/:assessmentid', memberDashboard.deleteAssessment);
router.post('/member/:id/addassessment', memberDashboard.addAssessment);


module.exports = router;
