const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler number test', function(){
    const numRegex = /(\d+\/\d+\.?\d*)|(\d*\.?\d+\/\d*\.?\d*)|(\d*\.\d+)|(\d+\.?)|(\d*)/i;
    
    test('convertHandler should correctly read a whole number input.', function(){
      assert.isNumber(convertHandler.getNum('2mi'), 'should correctly read a whole number input');  
    });
    
    test('convertHandler should correctly read a decimal number input.', function(){
      assert.match(convertHandler.getNum('2.34mi'), numRegex, 'should read a decimal number input');
    });
    
    test('convertHandler should correctly read a fractional input.', function(){
      assert.match(convertHandler.getNum('2/3mi'), numRegex, 'should read a fractional number input');
    });
    
    test('convertHandler should correctly read a fractional input with a decimal.', function(){
      assert.match(convertHandler.getNum('2.3/3mi'), numRegex, 'should read a fractional number with numerator being decimal');
      assert.match(convertHandler.getNum('2/3.4mi'), numRegex, 'should read a fractional number with denominator being decimal');
      assert.match(convertHandler.getNum('2.3/3.4mi'), numRegex, 'should read a fractional number with both numerator and denominator being decimals');
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(){
      assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
      assert.equal(convertHandler.getNum('3/2/4/5mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
      assert.equal(convertHandler.getNum('3.2/3/4mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
      assert.equal(convertHandler.getNum('3/3.2/4mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
      assert.equal(convertHandler.getNum('3/2/4.3mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
      assert.equal(convertHandler.getNum('3.2/2.4/4.3mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
      assert.equal(convertHandler.getNum('.mi'), 'invalid number', 'should pass if convertHandler returns invalid number');
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function(){
      assert.equal(convertHandler.getNum('mi'), 1, 'should pass if convertHandler returns 1');
    });
  });


  // ##################################################################

  const input = convertHandler.getUnit;
  const unitConvert = convertHandler.getReturnUnit;
  const spellUnit = convertHandler.spellOutUnit;
  suite('convertHandler unit test', function(){
    test('convertHandler should correctly read each valid input unit.', function(){
      assert.equal(unitConvert(input('34.3mi')), 'km', 'should return km if it passes');
      assert.equal(unitConvert(input('34.4km')), 'mi', 'should return mi if it passes');
      assert.equal(unitConvert(input('34.2gal')), 'L', 'should return L if it passes');
      assert.equal(unitConvert(input('34.2L')), 'gal', 'should return gal if it passes');
      assert.equal(unitConvert(input('34.2kg')), 'lbs', 'should return lbs if it passes');
      assert.equal(unitConvert(input('34.2lbs')), 'kg', 'should return kg if it passes');
    });

    test('convertHandler should correctly return an error for an invalid input unit.', function(){
      assert.equal(unitConvert(input('33.3')), 'invalid unit', 'should pass if unit is not provided');
      assert.equal(unitConvert(input('3.23UI')), 'invalid unit', 'should pass if unit is invalid');
      assert.equal(unitConvert(input('')), 'invalid unit', 'should if no unit is provided');
    });

    test('convertHandler should return the correct return unit for each valid input unit.', function(){
      assert.equal(unitConvert(input('34.3mi')), 'km', 'should return km if it passes');
      assert.equal(unitConvert(input('34.4km')), 'mi', 'should return mi if it passes');
      assert.equal(unitConvert(input('34.2gal')), 'L', 'should return L if it passes');
      assert.equal(unitConvert(input('34.2L')), 'gal', 'should return gal if it passes');
      assert.equal(unitConvert(input('34.2kg')), 'lbs', 'should return lbs if it passes');
      assert.equal(unitConvert(input('34.2lbs')), 'kg', 'should return kg if it passes');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(){
      assert.equal(spellUnit(unitConvert(input('13km'))), 'miles', 'should return miles');
      assert.equal(spellUnit(unitConvert(input('13mi'))), 'kilometers', 'should return kilometers');
      assert.equal(spellUnit(unitConvert(input('13gal'))), 'liters', 'should return liters');
      assert.equal(spellUnit(unitConvert(input('13L'))), 'gallons', 'should return gallons');
      assert.equal(spellUnit(unitConvert(input('13lbs'))), 'kilograms', 'should return kilograms');
      assert.equal(spellUnit(unitConvert(input('13kg'))), 'pounds', 'should return pounds');
    });
  });

  // ####################################################################

  suite('convertHandler unit conversion', function(){
    test('convertHandler should correctly convert gal to L.', function(){
      assert.equal(unitConvert(input('20gal')), 'L', 'should convert the unit gallons to liters');
    });
    test('convertHandler should correctly convert L to gal.', function(){
      assert.equal(unitConvert(input('20L')), 'gal', 'should convert the unit liters to gallons');
    });
    test('convertHandler should correctly convert mi to km.', function(){
      assert.equal(unitConvert(input('20mi')), 'km', 'should convert the unit miles to killometers');
    });
    test('convertHandler should correctly convert km to mi.', function(){
      assert.equal(unitConvert(input('20km')), 'mi', 'should convert the unit killometers to miles');
    });
    test('convertHandler should correctly convert lbs to kg.', function(){
      assert.equal(unitConvert(input('20lbs')), 'kg', 'should convert the unit pounds to kilograms');
    });
    test('convertHandler should correctly convert kg to lbs.', function(){
      assert.equal(unitConvert(input('20kg')), 'lbs', 'should convert the unit kilograms to pounds');
    });
  });
});