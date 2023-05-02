function ConvertHandler() {
  
  this.getNum = function(input) {
    const numRegex = /(\d+\/\d+\.?\d*)|(\d*\.?\d+\/\d*\.?\d*)|(\d*\.\d+)|(\d+\.?)|(\d*)/i;
  	let result = input.match(numRegex)[0];
  	const decRegex = /\./g;
    const multiDivRegex = /\d*\.?\d*\/\d*\.?\d*\/\d*\.?\d*[\/\d*\.?\d*]*/;

  	if(multiDivRegex.test(input)) return 'invalid number';  
  	
  	if(Boolean(result) === false && !decRegex.test(input)){
  		result = 1;
  	}else if(Boolean(result) === true){
  		result = eval(result);
  	}else{
      result = 'invalid number';
    }
  	return result;
  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-z]+$/i;
  	if(unitRegex.test(input)){
  		let result = input.match(unitRegex)[0];
  		return result;
  	}
  	return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = '';
    switch(initUnit.toLowerCase()){
      case 'km':
        result = 'mi';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit';
    };
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = '';
    switch(unit.toLowerCase()){
      case 'kg':
        result = 'kilograms';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'l':
        result = 'liters';
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = 0;

    switch(initUnit.toLowerCase()){
      case 'gal':
        result = galToL * initNum; //Convert gallons to litres
        break;
      case 'l':
        result = (1/galToL) * initNum; //Convert litres to gallons
        break;
      case 'lbs':
        result = lbsToKg * initNum; //Convert pounds to killograms
        break;
      case 'kg':
        result = (1/lbsToKg) * initNum; //Convert killograms to pounds
        break;
      case 'mi':
        result = miToKm * initNum; //Convert miles to kilometers
        break;
      case 'km':
        result = (1/miToKm) * initNum; //Convert kilometers to miles
        break;
      default:
        result = 'invalid unit';
    }
    
    return (typeof(result) === 'string')? 'invalid unit': Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
