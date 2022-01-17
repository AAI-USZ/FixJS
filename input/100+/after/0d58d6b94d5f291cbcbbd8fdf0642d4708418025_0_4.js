function() {
		    link.attr("x1", function(d) { return d.source.x; })
		    	.attr("y1", function(d) { return d.source.y; })
		    	.attr("x2", function(d) { return d.target.x; })
		    	.attr("y2", function(d) { return d.target.y; });
		    
		    node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });

		    stat.report('simulation running...');
		    stat.clear();
		}