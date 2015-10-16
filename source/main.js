'use strict';
require('babelify/polyfill'); //remove this line if you don't care about ES6 pollyfils
var d3 = require('d3');

d3.csv('data.csv', main);

function main(data){
	var processed = data.map( processData );
	var filtered = processed.filter( function(d){
		return (d.date.getFullYear() == 2001);
	} );

	console.log('data ', data );
	console.log('processed ', processed );
	console.log('filtered', filtered );
}



function processData(d){
	var dateFormat = d3.time.format('%Y-%m-%d');
	var total = Number( d.yes ) + Number( d.no );
	return {
		date: dateFormat.parse( d.date ),
		yes: Number( d.yes ),
		no: Number( d.no ),
		total: total,
		yesPct: 100/ total * Number( d.yes ),
		noPct: 100/ total * Number( d.no )
	};
}