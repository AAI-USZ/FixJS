function() {
				d3.select(this).transition()
					.style("fill", "steelblue")
					.attr("transform", "translate(" + x + "," + y + ")scale(0.035)")
				}