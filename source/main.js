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
		.call( numberSizeVis, {maxHeight:maxHeight, maxWidth:maxWidth});

}


function numberSizeVis(g, config){
	var blockScale = d3.scale.linear()
		.range([0, config.maxWidth-10])
		.domain([0,100])
	g.append('rect')
		.attr({
			'width': function(d){ return blockScale(d.yesPct) },
			'height': config.maxHeight-10,
			'class':'yes-block'
		});

	g.append('rect')
		.attr({
			'x': function(d){ return blockScale(d.yesPct) },
			'width': function(d){ return blockScale(d.noPct) },
			'height': config.maxHeight-10,
			'class':'no-block'
		});

	g.append('text')
		.attr({
			x: function(d){ return blockScale(d.yesPct) },
			y: (config.maxHeight-10)/2,
			dx: 5,
			'text-anchor':'start'
		})
		.text(function(d){ return Math.round(d.noPct) });

	g.append('text')
		.attr({
			x: function(d){ return blockScale(d.yesPct) },
			y: (config.maxHeight-10)/2,
			dx: -5,
			'text-anchor':'end'
		})
		.text(function(d){ return Math.round(d.yesPct) });
}

function numberVis(g, config){
	g.append('rect')
		.attr({
			'width': config.maxHeight-10,
			'height': config.maxHeight-10
		});

	g.append('text')
		.attr({
			x: config.maxWidth-10,
			y: (config.maxHeight-10)/2,
			'text-anchor':'end'
		})
		.text(function(d){ return Math.round(d.noPct) });

	g.append('text')
		.attr({
			x: 0,
			y: (config.maxHeight-10)/2
		})
		.text(function(d){ return Math.round(d.yesPct) });
}