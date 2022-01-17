function(json) {
			self.countries.selectAll('path')	// select all the current path nodes
			.data(json.features)				// bind these to the features array in json
			.enter().append('path')				// if not enough elements create a new path
			.attr('d', self.projection)				// transform the supplied jason geo path to svg
			.on('mouseover', function(d) {
				d3.select(this).style('fill','#6C0')
					.append('svg:title')
				    .text(d.properties.name);})
			.on('mouseout', function(d) {
				d3.select(this).style('fill','#000000');})
		}