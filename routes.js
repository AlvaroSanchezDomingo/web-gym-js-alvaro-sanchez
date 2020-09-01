"use strict";

const express = require("express");
const router = express.Router();

const trainerDashboard = require("./controllers/trainerDashboard.js");
const memberDashboard = require("./controllers/memberDashboard.js");
const accounts = require('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/registerTrainer', accounts.registerTrainer);
router.post('/authenticate', accounts.authenticate);
router.get('/account', accounts.accountIndex);
router.post('/account/changeName', accounts.changeName);
router.post('/account/changeLastName', accounts.changeLastName);
router.post('/account/changeGender', accounts.changeGender);
router.post('/account/changeHeight', accounts.changeHeight);


router.get("/trainer/:id", trainerDashboard.index);
router.get('/trainer', trainerDashboard.displayCurrent);
router.get("/trainer/deletemember/:id", trainerDashboard.deleteMember);
router.post('/member/:id/editComment/:assessmentid', trainerDashboard.editComment);


router.get('/member/:id', memberDashboard.index);
router.get('/member', memberDashboard.displayCurrent);
router.get('/member/:id/deleteassessment/:assessmentid', memberDashboard.deleteAssessment);
router.post('/member/:id/addassessment', memberDashboard.addAssessment);
router.post('/member/:id/addgoal', memberDashboard.addGoal);
router.get('/member/:id/missed/:goalid', memberDashboard.missedGoal);
router.get('/member/:id/achieve/:goalid', memberDashboard.achieveGoal);

module.exports = router;
