function updatePlot(name, datum, reference) {
	entry = timeSeriesData[name];
	entry.data.push({x: reference, y: datum});
	if (datum < entry.min)
		entry.min = datum;
	if (datum > entry.max)
		entry.max = datum;
		
	if (entry.data.length > 100)
		entry.data.splice(0, 1);


	var minX = entry.data[0].x;
	var maxX = last(entry.data).x;
	
	var x = d3.scale.linear()
		.domain([entry.data[0].x, last(entry.data).x])
		.range([0, 444]);
	
	var y = d3.scale.linear()
		.domain([entry.min, entry.max])
		.range([148, 0])
	
	var path = entry.svg.selectAll('path')
		.data([entry.data])
	
	var drawPath = function(d) {
		d.attr('d', d3.svg.line() 
			.x(function(d) { return x(d.x); })
			.y(function(d) { return y(d.y); })
			.interpolate('linear'));
	}
	
	path.enter().append('path')
		.call(drawPath)
	
	path.transition()
		.duration(0)
		.call(drawPath)
	
}