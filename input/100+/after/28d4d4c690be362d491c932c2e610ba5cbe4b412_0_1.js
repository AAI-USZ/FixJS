function() {
	    for (var i = 0; i < obj.cpu_count; i++) {
		
		var rect_user = chart[i].selectAll("rect.user")
		    .data(obj.data, function(d) { return d.time; });
		var rect_system = chart[i].selectAll("rect.system")
		    .data(obj.data, function(d) { return d.time; });
		
		rect_user.enter().insert("rect", "line")
		    .attr("y", function(d) { return h - y(d.values[i].user) - .5; })
		    .attr("width", w)
		    .attr("height", function(d) { return y(d.values[i].user); })
		    .attr("class", "user")
		    .attr("x", function(d, i) { return x(i) - .5; });
		rect_system.enter().insert("rect", "line")
		    .attr("y", function(d) { return h - y(d.values[i].system) - .5 - y(d.values[i].user); })
		    .attr("width", w)
		    .attr("height", function(d) { return y(d.values[i].system); })
		    .attr("class", "system")
		    .attr("x", function(d, i) { return x(i) - .5; });
		
		rect_user
		    .attr("color", "red")
		    .attr("x", function(d, i) { return x(i) - .5; })
		    .attr("y", function(d) { return h - y(d.values[i].user) - .5; })
		    .attr("height", function(d) { return y(d.values[i].user); });
		rect_system
		    .attr("x", function(d, i) { return x(i) - .5; })
		    .attr("y", function(d) { return h - y(d.values[i].system) - .5 - y(d.values[i].user); })
		    .attr("height", function(d) { return y(d.values[i].system); })
		    .attr("class", "system");
		
		rect_user.exit()
		    .remove();
		
		rect_system.exit()
		    .remove();
	    }
	}