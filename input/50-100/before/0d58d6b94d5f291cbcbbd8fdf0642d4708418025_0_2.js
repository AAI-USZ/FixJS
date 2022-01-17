function(d) {
	    noderadius = d3.event.srcElement.value;
	    d3.select('#chart').selectAll('circle.node')
		.attr('r',noderadius)
	}