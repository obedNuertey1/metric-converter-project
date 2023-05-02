'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  const evaluater = (input)=>{
    let initNum = convertHandler.getNum(input);
    let initUnit = ((convertHandler.getUnit(input)).toLowerCase() === 'l')? 'L':(convertHandler.getUnit(input)).toLowerCase();
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let myString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if(initNum === 'invalid number' && returnUnit === 'invalid unit') return 'invalid number and unit';

    if(initNum === 'invalid number') return 'invalid number';

    if(returnUnit === 'invalid unit') return 'invalid unit';
    
    
    return {initNum, initUnit, returnNum, returnUnit, string: myString};
  };
  
  app.route('/api/convert').get((req, res)=>{
    const {input} = req.query;
    let myJson = evaluater(input);
    
    if(typeof(myJson) === 'string'){
      res.send(myJson);
    }else{
      res.json(myJson);
    }
  });
};
