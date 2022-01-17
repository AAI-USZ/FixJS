function(data) {

	var graph = function (data) {
		nv.addGraph(function() {
			var chart = nv.models.linePlusMultiBarChart();

			chart.xAxis
				.axisLabel('Year');

			chart.yAxis1
				.tickFormat(function(d) { return '$' +d3.format(',.1f')(d)});
			
			d3.select('#chart1 svg')
				.datum(data)
				.transition().duration(500).call(chart);
			
			nv.utils.windowResize(chart.update);

			return chart;
		});
	}
	
	graph ( data[$('#data-selector .active').attr('id')] )
	
	$('#data-selector .btn').click( function() {
		graph ( data[$(this).attr('id')] );
	} );
	
	

}