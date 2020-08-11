'use strict';

const memberstore = require('../models/member-store');
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
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    logger.debug(`Login member:  ${member.email}`);
    if (member) {
      response.cookie('webgym', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/member/'+member.id);
    } else {
      response.redirect('/login');
      logger.info(`Member not exist`);
    }
  },

  getCurrentUser(request) {
    const memberEmail = request.cookies.member;
    return memberstore.getMemberByEmail(memberEmail);
  },
};

module.exports = accounts;