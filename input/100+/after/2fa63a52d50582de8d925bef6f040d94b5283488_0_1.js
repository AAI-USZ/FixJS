function (message) {
		var longitude = message.longitude,
			latitude = message.latitude,
			text = message.title,
			city = message.city;

		var coordinates = self.map([longitude, latitude]);
			x = coordinates[0];
			y = coordinates[1];
	
		self.svg.append("svg:path")
			.attr("d", personPath)
			.attr("transform", "translate(" + x + "," + y + ")scale(0.035)")
			.attr("class", "member")
			.style("fill", "steelblue")
			.on("mouseover", function(){
				d3.select(this).transition()
					.style("fill", "red")
					.attr("transform", "translate(" + x + "," + y + ")scale(0.07)")
				})
			.on("mouseout", function() {
				d3.select(this).transition()
					.style("fill", "steelblue")
					.attr("transform", "translate(" + x + "," + y + ")scale(0.035)")
				});
				
		self.svg.append("svg:text")
			.text(function(d) { return city; })
			.attr("x", x)
			.attr("dy", y + 12)
			.attr('text-anchor', 'middle')
			.attr("class", "city")
			.transition().delay(4000)
			 .style("opacity", "0");

		//var hoverFunc = function () {
		//	person.attr({fill:"#ff9"});
		//	$(title.node).fadeIn("fast");
		//	$(subtitle.node).fadeIn("fast");
		//};
		//var hideFunc = function () {
		//	person.attr({fill:"red"});
		//	$(title.node).fadeOut("slow");
		//	$(subtitle.node).fadeOut("slow");
		//};
		//
		//$(person.node).hover(hoverFunc, hideFunc);
        //
		//person.animate(2000, "elastic", function () {
		//	$(title.node).fadeOut(5000);
		//	$(subtitle.node).fadeOut(5000);
		//});
	}