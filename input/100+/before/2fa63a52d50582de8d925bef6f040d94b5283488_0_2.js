function ZmgcClient() {
	var personPath = "M255.968,166.154c34.206,0,61.936-27.727,61.936-61.934c0-34.208-27.729-61.936-61.936-61.936s-61.936,27.728-61.936,61.936 C194.032,138.428,221.762,166.154,255.968,166.154z M339.435,194.188c-13.082-13.088-28.625-20.924-84.83-20.924 c-56.214,0-71.38,8.505-83.796,20.924c-12.422,12.416-8.23,144.883-8.23,144.883l27.485-65.304l17.28,194.554l49.856-99.57 l46.521,99.57l16.456-194.554l27.487,65.304C347.664,339.07,352.521,207.271,339.435,194.188z";
	if (! (this instanceof arguments.callee)) {
		return new arguments.callee(arguments);
	}
	var self = this;
	
	this.init = function() {
		self.setupBayeuxHandlers();
		if ($('#viz').length > 0) {
			console.log('we have a VIZ id');
			self.drawGlobe();
		}
		if ($('#map').length > 0) {
			console.log('we have a map id');
			self.drawMap();
		}
	};

	var width = $("#map").width(),
		mapCanvasHeight = (width * 0.45);
	
	this.setupBayeuxHandlers = function() {
		$.getJSON("/config.json", function (config) {
			self.client = new Faye.Client("http://" + window.location.hostname + ":" + config.port + "/faye", {
				timeout: 120
			});

			self.client.subscribe("/stat", function (message) {
				// console.log("MESSAGE", message);
				self.drawMarker(message);
			});
		});
	};
	
	this.drawGlobe = function	() {
		var width = height = $("#viz").width(),
			centered,
			feature,
			lat = lon = 0.0;

		var projection = d3.geo.azimuthal()
		    .scale(95)
		    .origin([lat,lon])
		    .mode("orthographic")
		    .translate([width - 100, height - 80]);

		var circle = d3.geo.greatCircle()
		    .origin(projection.origin());

		// TODO fix d3.geo.azimuthal to be consistent with scale
		var scale = {
		  orthographic: 95,
		  stereographic: 95,
		  gnomonic: 95,
		  equidistant: 95 / Math.PI * 2,
		  equalarea: 95 / Math.SQRT2
		};

		var path = d3.geo.path()
		    .projection(projection);

		var svg = d3.select("#viz").append("svg:svg")
		    .attr("width", width)
		    .attr("height", height)
		    .on("mousedown", mousedown);


		svg.append("rect")
		    .attr("fill", "none")
		    .attr("width", width)
		    .attr("height", height)
				.on("mouseover", function() {
				    $('#howto').text("Testing123");
						console.log("IN");
				  })
				.on("mouseout", 	function() {
					    $('#howto').text("");
							console.log("Out");
					  })
				.attr("pointer-events", "all");

		d3.json("/ui/data/world-countries.json", function(collection) {
			feature = svg.selectAll("path")
			.data(collection.features)
			.enter().append("svg:path")
			.on("mouseover", function(d) {
				d3.select(this).style("fill","#6C0");})
			.on("mouseout", function(d) {
				d3.select(this).style("fill","#000000");})
			.on("click", click)
			.attr("d", clip);

			feature.append("svg:title")
			.text(function(d) { return d.properties.name; });

			// startAnimation();
			// d3.select('#animate').on('click', function () {
				//     if (done) startAnimation(); else stopAnimation();
				// });
		});

		d3.select(window)
		    .on("mousemove", mousemove)
		    .on("mouseup", mouseup);

		d3.select("select").on("change", function() {
		  projection.mode(this.value).scale(scale[this.value]);
		  refresh(750);
		});

		function startAnimation() {
		  done = false;
		  d3.timer(function() {
		    var origin = projection.origin();
		    o1 = [origin[0] + .18, origin[1] + .06];
		    projection.origin(o1);
		    circle.origin(o1);
		    refresh();
		    return done;
		  });
		}

		var m0,
		    o0;

		function mousedown() {
		  m0 = [d3.event.pageX, d3.event.pageY];
		  o0 = projection.origin();
		  d3.event.preventDefault();
		}

		function mousemove() {
		  if (m0) {
		    var m1 = [d3.event.pageX, d3.event.pageY],
		        o1 = [o0[0] + (m0[0] - m1[0]) / 8, o0[1] + (m1[1] - m0[1]) / 8];
		    projection.origin(o1);
		    circle.origin(o1);
		    refresh();
		  }
		}

		function click(d) {
		  var x = 10,
		      y = 10;
		  // If the click was on the centered state or the background, re-center.
		  // Otherwise, center the clicked-on state.
		  //if (!d || centered === d) {
		  //  centered = null;
		  //} else {
		  //  var centroid = path.centroid(d);
		  //  x = width / 2 - centroid[0];
		  //  y = height / 2 - centroid[1];
		  //  centered = d;
			//	console.log(centroid);
		  //}

		  // Transition to the new transform.
		  svg.transition()
		      .attr("transform", "translate(" + x + "," + y + ")");
		}


		function mouseup() {
		  if (m0) {
		    mousemove();
		    m0 = null;
		  }
		}
		function refresh(duration) {
		  (duration ? feature.transition().duration(duration) : feature).attr("d", clip);
		}

		function clip(d) {
		  return path(circle.clip(d));
		}
		
		// Initialise
		//this.init();
	}
	
	
	this.drawMap = function () {
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

	this.drawMarker = function (message) {
		var longitude = message.longitude,
			latitude = message.latitude,
			text = message.title,
			city = message.city;

		var coordinates = self.map([longitude, latitude]);
			x = coordinates[0];
			y = coordinates[1];
		
		self.member = self.svg.append("svg:g")
			.attr("transform", function() {
				 return "translate(" + x + "," + y + ")"; });
			
		self.member.append("svg:path")
		//self.member.append("svg:circle")
			.attr("d", personPath)
			.attr("transform","scale(0.07)")
			//.attr("r", 5)
			.attr("class", "member")
			.style("fill", "steelblue")
			.on("mouseover", function(){
				d3.select(this).transition()
					//.attr("r", 20)
					.style("fill", "red")	
				})
			.on("mouseout", function() {
				d3.select(this).transition()
					//.attr("r", 5)
					.style("fill", "steelblue")
				});
				
		self.svg.append("svg:text")
			.text(function(d) { return city; })
			.attr("x", x)
			.attr("dy", y + 20)
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
	this.enlargeMarker = function mouseover(d) {
	  this.parentNode.appendChild(this);
	  d3.select(this).transition()
	      .duration(750)
	      .attr("transform", "translate(480,480)scale(23)rotate(180)")
	    .transition()
	      .delay(1500)
	      .attr("transform", "translate(240,240)scale(10)")
	      .style("fill-opacity", 10)
	      //.remove();
	}
	// Initialise
	this.init();
}