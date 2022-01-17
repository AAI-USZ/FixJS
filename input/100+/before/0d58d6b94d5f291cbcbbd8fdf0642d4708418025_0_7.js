function(d) {
	    d3.select('#query').property('value','')
	    d3.select("#chart").selectAll('svg')
		.transition()
		.duration(ttime)
		.style('opacity',0)
		.remove();
	    d3.select('#wordcol').selectAll('svg')
		.transition()
		.duration(ttime)
		.style('opacity',0)
		.remove();
	    words = [];
	}