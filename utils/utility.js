'use strict';


const utility  = {
  
  MemberStats(member){
    let stats = {
    }
    let weight = member.startingWeight;
    if(member.assessments.length>0){
      weight = member.assessments[member.assessments.length-1].weight;
    }
    stats.bmi=this.calculateBMI(member,weight);
    stats.bmiCategory=this.determineBMICategory(stats.bmi);
    stats.isIdealBodyweight=this.isIdealBodyWeight(member,weight);
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
  },
  isIdealBodyWeight(member, weight){
    const fiveFeet = 60.0;
    let idealBodyWeight;
    const inches = member.height* 39.37;
    
    if (inches <= fiveFeet) {
      if (member.gender==="M") {
        idealBodyWeight = 50;
      } else {
        idealBodyWeight = 45.5;
      }
    } else {
      if (member.gender==="M") {
        idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
      } else {
        idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
      }
    }
    return (parseFloat(weight)<=idealBodyWeight+2) &&  (parseFloat(weight)>=idealBodyWeight-2) ;
  },
  determineBMICategory(bmi){
    if(bmi<15){
      return "VERY SEVERELY UNDERWEIGHT";
    }else if(bmi>=15 && bmi<16){
      return "SEVERELY UNDERWEIGHT";
    }else if(bmi>=16 && bmi<18.5){
      return "UNDERWEIGHT";
    }else if(bmi>=18.5 && bmi<25){
      return "NORMAL";
    }else if(bmi>=25 && bmi<30){
      return "OVERWEIGHT";
    }else if(bmi>=30 && bmi<35){
      return "MODERATELY OBESE";
    }else if(bmi>=35 && bmi<40){
      return "SEVERELY OBESE";
    }else{
      return "VERY SEVERELY OBESE";
    }
  }
};
                 
module.exports = utility;