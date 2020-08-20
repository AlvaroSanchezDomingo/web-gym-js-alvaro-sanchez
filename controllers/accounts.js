'use strict';

const memberstore = require('../models/member-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('webgym', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    member.assessments = [];
    member.goals = [];
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },
  registerTrainer(request, response) {
    const trainer = request.body;
    trainer.id = uuid.v1();
    trainerstore.addTrainer(trainer);
    logger.info(`registering ${trainer.email}`);
    response.redirect('/');
  },
  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (member) {
      response.cookie('webgym', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/member/'+member.id);
    } 
    else if(trainer){
      response.cookie('webgym', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainer/'+trainer.id);
    }
    else {
      response.redirect('/login');
      logger.info(`Member not exist`);
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.webgym;
    return memberstore.getMemberByEmail(memberEmail);
  },
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.webgym;
    return trainerstore.getTrainerByEmail(trainerEmail);
  },
  accountIndex(request, response){
    const memberEmail = request.cookies.webgym;
    const member = memberstore.getMemberByEmail(memberEmail);
    const viewData = {
      title: 'Member Data',
      member: member,
    };
    response.render('accountSettings', viewData);
  },
  changeName(request, response) {
    const memberEmail = request.cookies.webgym;
    let member = memberstore.getMemberByEmail(memberEmail);
    member.name=request.body.name;
    memberstore.updateMember(member);
    response.redirect('/account');
  },
  changeLastName(request, response) {
    const memberEmail = request.cookies.webgym;
    let member = memberstore.getMemberByEmail(memberEmail);
    member.lastName=request.body.lastName;
    memberstore.updateMember(member);
    response.redirect('/account');
  },
  changeGender(request, response) {
    const memberEmail = request.cookies.webgym;
    let member = memberstore.getMemberByEmail(memberEmail);
    member.gender=request.body.gender;
    memberstore.updateMember(member);
    response.redirect('/account');
  },
  changeHeight(request, response) {
    const memberEmail = request.cookies.webgym;
    let member = memberstore.getMemberByEmail(memberEmail);
    member.height=request.body.height;
    memberstore.updateMember(member);
    response.redirect('/account');
  },
};

module.exports = accounts;