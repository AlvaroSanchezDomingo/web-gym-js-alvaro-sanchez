'use strict';


const utility  = {
  
//parseFloat(num1)+parseFloat(num2);
  
  MemberStats(member){
    let stats = {
    }
    let weight = member.startingWeight;
    if(member.assessments.length>0){
      weight = member.assessments[member.assessments.length-1].weight;
    }
    stats.bmi=this.calculateBMI(member,weight);
    stats.bmiCategory='category';
    stats.isIdealBodyweight=true;
    return stats;
  },
  calculateBMI(member, weight){
    if(member.height<0){
      return 0;
    }
    else{
      const result = parseFloat(weight)/(parseFloat(member.height)*parseFloat(member.height));
      return result.toFixed(2);
    }
  }
};
                 
module.exports = utility;