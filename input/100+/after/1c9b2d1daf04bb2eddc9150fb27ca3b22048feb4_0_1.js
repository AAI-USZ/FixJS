function() {
	    for (var i = 0; i < obj.cpu_count; i++) {
		
		var rect_user = obj.chart[i].selectAll("rect.user")
		    .data(obj.data, function(d) { return d.time; });
		var rect_system = obj.chart[i].selectAll("rect.system")
		    .data(obj.data, function(d) { return d.time; });
	    
		rect_user.enter().insert("rect", "line")
		    .attr("x", function(d, i) { return obj.x(i + 1) - .5; })
		    .attr("y", function(d) { return obj.h - obj.y(d.values[i].user) - .5; })
		    .attr("width", obj.w)
		    .attr("height", function(d) { return obj.y(d.values[i].user); })
		    .attr("class", "user")
		    .transition()
		    .duration(0)
		    .attr("x", function(d, i) { return obj.x(i) - .5; });
		rect_system.enter().insert("rect", "line")
		    .attr("x", function(d, i) { return obj.x(i + 1) - .5; })
		    .attr("y", function(d) { return obj.h - obj.y(d.values[i].system) - .5 - obj.y(d.values[i].user); })
		    .attr("width", obj.w)
		    .attr("height", function(d) { return obj.y(d.values[i].system); })
		    .attr("class", "system")
		    .transition()
		    .duration(0)
		    .attr("x", function(d, i) { return obj.x(i) - .5; });
		
		rect_user.transition()
		    .duration(0)
		    .attr("color", "red")
		    .attr("x", function(d, i) { return obj.x(i) - .5; })
		    .attr("y", function(d) { return obj.h - obj.y(d.values[i].user) - .5; })
		    .attr("height", function(d) { return obj.y(d.values[i].user); })
		    .attr("class", "user");
		rect_system.transition()
		    .duration(0)
		    .attr("x", function(d, i) { return obj.x(i) - .5; })
		    .attr("y", function(d) { return obj.h - obj.y(d.values[i].system) - .5 - obj.y(d.values[i].user); })
		    .attr("height", function(d) { return obj.y(d.values[i].system); })
		    .attr("class", "system");
		
		rect_user.exit().transition()
		    .duration(0)
		    .attr("x", function(d, i) { return obj.x(i - 1) - .5; })
		    .remove();
		
		rect_system.exit().transition()
		    .duration(0)
		    .attr("x", function(d, i) { return obj.x(i - 1) - .5; })
		    .remove();
	    }
	}