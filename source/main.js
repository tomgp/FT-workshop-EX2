'use strict';
require('babelify/polyfill'); //remove this line if you don't care about ES6 pollyfils
var d3 = require('d3');
var processElement = require('./process-data.js');

d3.csv('data.csv', main);

function main(data){
	var processed = data.map(processElement);
	var filtered = processed.filter( function(d){
		return (d.date.getFullYear() == 2001);
	} );

	console.log('data ', data );
	console.log('processed ', processed );
	console.log('filtered', filtered );
}



