# Metric-Imperial Converter - Documentation

### Overview:
- [Introduction](#introduction)
- [Api End Point Info](#api-end-point-info)
- [View Site](https://obn-metric-converter.onrender.com/)

## Introduction
This Metric/Imperial Converter Microservice is your one-stop shop for unit conversion. This feature-rich service allows you to easily convert between metric and imperial units, with conversions ranging from gallons to liters to pounds to kilograms and more. This microservic supports a variety of input formats, and displays clear error signals for faulty inputs. Enjoy simple unit conversions with ease.

![image](https://github.com/obedNuertey1/metric-converter-project/assets/101027384/838611ca-c3fa-415a-b89b-4018cda92a32)


## Api End Point Info
* You can **GET** `/api/convert` with a single parameter containing an accepted number and unit and have it converted. (Hint: Split the input by looking for the index of the first character which will mark the start of the unit)
* You can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)
* You can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)
* You can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)
* All incoming units should be accepted in both upper and lower case, but should be returned in both the initUnit and returnUnit in lower case, except for liter, which should be represented as an uppercase 'L'.
* If the unit of measurement is invalid, returned will be 'invalid unit'.
* If the number is invalid, returned will be 'invalid number'.
* If both the unit and number are invalid, returned will be 'invalid number and unit'.
* You can use fractions, decimals or both in the parameter (ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.
* Your return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in the format '{initNum} {initUnitString} converts to {returnNum} {returnUnitString}' with the result rounded to 5 decimals.
