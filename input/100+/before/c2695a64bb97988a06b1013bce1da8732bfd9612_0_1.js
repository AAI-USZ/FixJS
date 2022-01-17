function (message) {
		var longitude = message.longitude,
			latitude = message.latitude,
			text = message.title,
			city = message.city;

		var coordinates = self.map([longitude, latitude]);
			x = coordinates[0];
			y = coordinates[1];
		
		//self.member = self.svg.append("svg:g")
		//	.attr("transform", function() { return "translate(" + x + "," + y + ")"; })
		//	//.attr("x", x)
		//	//.attr("dy", y)
		//	//.attr("transform","scale(0.05)")
		//	.attr("class", "member");
		//
		//self.member.append("path")
		//	.attr("d", personPath)
		//	.attr("transform","scale(0.05)")
		//	//.attr("class", "member")
		//	.style("fill", "steelblue")		
		//	.on("mouseover", function(){
		//		d3.select(this).transition()
		//			console.log('over');
		//	})
		//	.on("mouseout", function() {
		//		d3.select(this).transition()
		//			console.log('out');
		//	});
				
		self.svg.append("svg:circle")
				.attr("r", 5)
			    .attr("transform", function() { return "translate(" + x + "," + y + ")"; })
				.attr("class", "member")
				.style("fill", "steelblue")
				.on("mouseover", function(){
					  d3.select(this).transition()
					      .attr("r", 15)
					})
				.on("mouseout", function() {
						//this.parentNode.appendChild(this);
						  d3.select(this).transition()
						      .attr("r", 5)
					});
		self.svg.append("svg:text")
			.attr("x", x - 10)
			.attr("dy", y + 10)
			.style("fill", "red")
			.text(function(d) { return city; });

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