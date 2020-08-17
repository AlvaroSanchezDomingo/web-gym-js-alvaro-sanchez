'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainerStore  = {
  
  store: new JsonStore('./models/member-store.json', { trainerCollection: [] }),
  trainerCollection: 'trainerCollection',
  
  getAllTrainers() {
    return this.store.findAll(this.trainerCollection);
  },
  getTrainer(id) {
    return this.store.findOneBy(this.trainerCollection, { id: id });
  },
  addTrainer(trainer) {
    this.store.add(this.trainerCollection, trainer);
    this.store.save();
  },
  getTrainerByEmail(email) {
    return this.store.findOneBy(this.trainerCollection, { email: email });
  },
  removeTrainer(id) {
    const trainer = this.getTrainer(id);
    this.store.remove(this.trainerCollection, trainer);
    this.store.save();
  },
  updateAssessment(changedAssessment){
    let assessment = this.store.findByIds(this.memberCollection, { id: changedAssessment });
    assessment=changedAssessment;
    this.store.save();
  },
  getAssessment(assessmentId){
    return this.store.findByAIds(this.memberCollection, { id: assessmentId });
  }
  
};
                 
module.exports = trainerStore;