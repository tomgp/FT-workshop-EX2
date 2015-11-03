'use strict';
require('babelify/polyfill'); //remove this line if you don't care about ES6 pollyfils
var processData = require('./process-data.js');
var d3 = require('d3');

d3.csv('data.csv', main);

function main(data){
	//configuration
	var width = 1000,
		height = 1000,
		margin = {
			top:20,
			left:20,
			bottom:20,
			right:20
		},
		maxWidth = 100,
		maxHeight = 100;

	var processed = data.map( processData );

	console.log( 'processed', processed );

	var filtered = processed.filter( function(d){
		return (d.date.getFullYear() == 2001);
	} );

	var dimensions = Math.ceil( Math.sqrt(filtered.length) );

	var svg = d3.select('#chart')
		.append('svg')
			.attr({
				width: width,
				height: height
			})
		.append('g')
			.attr({
				'transform':'translate(' + margin.left + ',' + margin.top + ')'
			});

	svg.selectAll('.mark')
		.data(filtered)
			.enter()
		.append('g')
			.attr({ 
				'class': 'mark',
				'transform': function(d, i){
					var xPos = Math.floor(i/dimensions) * maxWidth,
						yPos = (i%dimensions) * maxHeight;

					return 'translate(' + xPos + ',' + yPos + ')';
				}
			})
		.append('rect')
			.attr({
				'width': maxHeight-10,
				'height': maxHeight-10
			});

	console.log('filtered' , filtered);
}