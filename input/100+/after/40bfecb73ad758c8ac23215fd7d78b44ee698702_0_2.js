function () {
		var data;

		// Most parts of D3 don"t know anything about SVG—only DOM.
		self.svg = d3.select("#map").append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("viewBox", "0 0 " + width + " " + mapCanvasHeight);

		self.map = d3.geo.equirectangular().scale(width);
		self.projection = d3.geo.path().projection(self.map);
		
		
		self.countries = self.svg.append("svg:g").attr("id", "countries");
		
		// Load data from .json file
		d3.json("/ui/data/world-countries.json", function(json) {
			self.countries.selectAll("path")	// select all the current path nodes
			.data(json.features)				// bind these to the features array in json
			.enter().append("path")				// if not enough elements create a new path
			.attr("d", self.projection)				// transform the supplied jason geo path to svg
			.on("mouseover", function(d) {
				d3.select(this).style("fill","#6C0")
					.append("svg:title")
				    .text(d.properties.name);})
			.on("mouseout", function(d) {
				d3.select(this).style("fill","#000000");})
		});
		
		//fisheye = d3.fisheye();
		//self.svg.on("mousemove", function() {
		//  fisheye.center(d3.mouse(this));
		//	console.log(self.countries);
		//	
		  //self.svg.attr("d", function(d) { return line(d.map(fisheye)); });
		//});
	}