'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore  = {
  
  store: new JsonStore('./member-store.json', { memberCollection: [] }),
  memberCollection: 'memberCollection',
  
  getAllMembers() {
    return this.store.findAll(this.memberCollection);
  },

  getMember(id) {
    return this.store.findOneBy(this.memberCollection, { id: id });
  },
  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const songs = member.assessments;
    _.remove(member.assessments, { id: assessmentId });
    this.store.save();
  },
  
  removeMember(id) {
    
    const member = this.getMember(id);
    this.store.remove(this.memberCollection, member);
    this.store.save();
  },
  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
    this.store.save();
  },
  addMember(member) {
    this.store.add(this.memberCollection, member);
    this.store.save();
  },
};
                 
module.exports = memberStore;