function ZmgcClient() {
	var personPath = 'M255.968,166.154c34.206,0,61.936-27.727,61.936-61.934c0-34.208-27.729-61.936-61.936-61.936s-61.936,27.728-61.936,61.936 C194.032,138.428,221.762,166.154,255.968,166.154z M339.435,194.188c-13.082-13.088-28.625-20.924-84.83-20.924 c-56.214,0-71.38,8.505-83.796,20.924c-12.422,12.416-8.23,144.883-8.23,144.883l27.485-65.304l17.28,194.554l49.856-99.57 l46.521,99.57l16.456-194.554l27.487,65.304C347.664,339.07,352.521,207.271,339.435,194.188z';
	if (! (this instanceof arguments.callee)) {
		return new arguments.callee(arguments);
	}
	var self = this,
		width = $('#map').width(),
		mapCanvasHeight = (width * 0.45);

	this.init = function() {
		self.drawMap();
		self.setupBayeuxHandlers();
	};

	this.setupBayeuxHandlers = function() {
		$.getJSON('/config.json', function (config) {
			self.client = new Faye.Client('http://' + window.location.hostname + ':' + config.port + '/faye', {
				timeout: 120
			});

			self.client.subscribe('/stat', function (message) {
				// console.log('MESSAGE', message);
				self.drawMarker(message);
			});
		});
	};

	this.drawMap = function () {
		var data;

		// Most parts of D3 don't know anything about SVG—only DOM.
		self.map = d3.geo.equirectangular().scale(width);
		self.projection = d3.geo.path().projection(self.map);
		self.svg = d3.select('#map').append('svg:svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('viewBox', '0 0 ' + width + ' ' + mapCanvasHeight);
		
		self.countries = self.svg.append('svg:g').attr('id', 'countries');

		// Load data from .json file
		d3.json('/ui/data/world-countries.json', function(json) {
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
		});
		
		//fisheye = d3.fisheye();
		//self.svg.on('mousemove', function() {
		//  fisheye.center(d3.mouse(this));
		//	console.log(self.countries);
		//	
		  //self.svg.attr('d', function(d) { return line(d.map(fisheye)); });
		//});
	}

	this.drawMarker = function (message) {
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
	// Initialise
	this.init();
}