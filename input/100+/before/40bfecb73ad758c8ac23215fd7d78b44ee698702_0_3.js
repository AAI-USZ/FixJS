function (message) {
		var longitude = message.longitude,
			latitude = message.latitude,
			text = message.title,
			city = message.city;

		var coordinates = self.map([longitude, latitude]);
			console.log(coordinates);
			x = coordinates[0];
			y = coordinates[1];

		self.svg.append('svg:circle')
			.attr('r', 5)
			.style('fill', 'steelblue')
			.attr('cx', x)
			.attr('cy', y);

		//self.svg.append('svg:circle')
		//    .attr("transform", function() {
		//		console.log(coordinates);
		//        return "translate(" + self.projection(coordinates) + ")"; 
		//    })
		//	.style('fill', 'steelblue')
		//    .attr('r', 5);
		//var person = self.path(personPath);
		//	console.log(person, 'person');
		//	person.translate(-255, -255); // Reset location to 0,0
		//	person.translate(x, y);
		//	person.scale(0.03, 0.03);
		//	person.attr({
		//		fill: 'red',
		//		stroke: 'transparent'
		//	});
        //
		//var title = self.svg.text(x, y + 11, text);
		//title.attr({
		//	fill: 'red',
		//	'font-size': 10,
		//	'font-family': ''Helvetica Neue', 'Helvetica', sans-serif',
		//	'font-weight': 'bold'
		//});
		//var subtitle = self.map.text(x, y + 21, city);
		//subtitle.attr({
		//	fill: '#999',
		//	'font-size': 7,
		//	'font-family': ''Helvetica Neue', 'Helvetica', sans-serif'
		//});
        //
		//var hoverFunc = function () {
		//	person.attr({fill:'#ff9'});
		//	$(title.node).fadeIn('fast');
		//	$(subtitle.node).fadeIn('fast');
		//};
		//var hideFunc = function () {
		//	person.attr({fill:'red'});
		//	$(title.node).fadeOut('slow');
		//	$(subtitle.node).fadeOut('slow');
		//};
		//
		//$(person.node).hover(hoverFunc, hideFunc);
        //
		//person.animate(2000, 'elastic', function () {
		//	$(title.node).fadeOut(5000);
		//	$(subtitle.node).fadeOut(5000);
		//});
	}