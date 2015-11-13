var d3 = require('d3');

module.exports = function (d){
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
	};