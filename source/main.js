'use strict';
require('babelify/polyfill'); //remove this line if you don't care about ES6 pollyfils
var d3 = require('d3');

d3.csv('data.csv', main);

function main(data){
	var dateFormat = d3.time.format('%Y-%m-%d');
	console.log(data);
}