function() {

	// div size (get dynamically)
	var h = document.getElementById("divGeo").offsetHeight;
	var w = document.getElementById("divGeo").offsetWidth;

	// toy data
	var states = this.markers; //this.initMarkers();
	var coords = this.geoCoords;
	var foci = [coords.length]; // cluster foci, i.e. areas lat,lons

	// find center and extent of coords
	var meanLat = 0,
		meanLon = 0,
		minLat = 90,
		maxLat = -90,
		minLon = 180,
		maxLon = -180;
	for (var i = 0; i < coords.length; i++) {
	
		// latitude
		var lat = parseFloat(coords[i].lat);
		meanLat += lat;
		if (lat < minLat) { minLat = lat; }
		if (lat > maxLat) { maxLat = lat; }
	
		// longitude
		var lon = parseFloat(coords[i].lon);	
		if (lon < minLon) { minLon = lon; }
		if (lon > maxLon) { maxLon = lon; }		
		// convert to 0 to 360
		if (lon < 0) { lon = 360 + lon; }
		meanLon += lon;	
		
	}
	meanLat /= coords.length;
	meanLon /= coords.length;
	// convert back to -180 to 180
	if (meanLon > 180) {
		meanLon = meanLon - 360
	}
		
	// create polymaps object
	var po = org.polymaps;
	
	// create the map object, add it to #divGeo
	var map = po.map()
		.container(d3.select("#divGeo").append("svg:svg").node())
		.center({lat:meanLat,lon:meanLon})
		.zoom(15)
		.add(po.interact())
		.add(po.image()
		  .url(po.url("http://{S}tile.cloudmade.com"
		  + "/5b7ebc9342d84da7b27ca499a238df9d" // http://cloudmade.com/register
		  + "/999/256/{Z}/{X}/{Y}.png")
		//  + "/44979/256/{Z}/{X}/{Y}.png")
// 		  + "/998/256/{Z}/{X}/{Y}.png")
		  .hosts(["a.", "b.", "c.", ""])))
		.add(po.compass().pan("none"));
	this.map = map;	
	
	

	// zoom out to fit all the foci	
	// need to center map at {0,0} when zoom is 1 to put entire globe in view
	while (minLat < map.extent()[0].lat) { 
		map.zoomBy(-1); 
		if (map.zoom() <= 2) { map.center({lat:20,lon:20}) }
	}
	while (minLon < map.extent()[0].lon) { 
		map.zoomBy(-1); 
		if (map.zoom() <= 2) { map.center({lat:20,lon:20}) }		
	}	
	while (maxLat > map.extent()[1].lat) { 
		map.zoomBy(-1); 
		if (map.zoom() <= 2) { map.center({lat:20,lon:20}) }		
	}	
	while (maxLon > map.extent()[1].lon) { 
		map.zoomBy(-1); 
		if (map.zoom() <= 2) { map.center({lat:20,lon:20}) }		
	}
	console.log(meanLat,meanLon);
	console.log(minLat, maxLat, minLon, maxLon);

	this.bestZoom = map.zoom();	
		
	var layer = d3.select("#divGeo svg").insert("svg:g", ".compass");
	
	// assign foci xy coordinates from geographical coordinates
	for (var i = 0; i < coords.length; i++)
		foci[i] = map.locationPoint(coords[i]);	

	// create force layout
	var force = d3.layout.force()
		.nodes(states)
		.links([])
		.charge( -1.5 * map.zoom())
		//.charge(-Math.pow(1.5, map.zoom()) + 8*map.zoom())
		.gravity(0.0)
		.theta(1.5)
		.friction(0.5)
		//.alpha(100000)
		.size([w, h])
		;
		
	states.forEach(function(d, i) {
		d.x = foci[d.area].x;
		d.y = foci[d.area].y;
	});

	force.start();
	
	// create svg markers
	var node = layer.selectAll("circle.node")
			.data(states)
		.enter().append("svg:circle")
			.attr("class","node")
			.attr("cx", function(d) { return foci[d.area].x; })
			.attr("cy", function(d) { return foci[d.area].y; })
//			.attr("r",  function(d) { return 3 * Math.sqrt(d.val); })
			.attr("r",  function(d) { return Math.pow( map.zoom() / Phylowood.bestZoom, 2) * d.val * 4; })
			.attr("fill", function(d) { return d.color; })
		//	.attr("stroke", "white")
			.attr("stroke-width", 1)
			.attr("fill-opacity", 1)
			.attr("visibility","hidden")
			;

	// freeze markers during pan & zoom
	d3.select("#divGeo")
		.on("mousedown", mousedown)
		.on("mouseup", mouseup);
		
	function mousedown() {
		force.stop();
	}
	
	function mouseup() {
		// disabled to suppress d3.layout.pack "boioioing"-iness
		//force.resume();
	}

	// update coordinates when map pans and zooms
	map.on("move", function() {

		force.stop();
		// update force properties with each move
		//force.charge( -1.5 * map.zoom());
		//force.gravity(0.0);
		
		// better visualization: have all nodes retain actual positions, instead of refocusing
		// it seems like areas contract at different zoom levels... weird
		// update positions of js states[] objects
		
		states.forEach(function(o,i) {
			xy = map.locationPoint({"lon": o.lon, "lat":o.lat});
			o.x = xy.x;
			o.y = xy.y; 
		});
		
		// update positions and radii for nodes
		node.attr("cx", function(d) { return d.x; })
		    .attr("cy", function(d) { return d.y; })
		    .attr("r", function(d) { return  Math.pow( map.zoom() / Phylowood.bestZoom, 2) * d.val * 4; }) // change vs. zoom??


		// update force foci positions
		for (var i = 0; i < coords.length; i++)
			foci[i] = map.locationPoint(coords[i]);
		
	//	force.resume();

	});	


	// update node[] each tick
	force.on("tick", function(e) {

		// set stepsize per tick
		var k = e.alpha * 5;

		// update object values per tick
		states.forEach(function(o,i) {
			o.x += (foci[o.area].x - o.x) * k
			o.y += (foci[o.area].y - o.y) * k
			var latlon = map.pointLocation({"x": o.x, "y": o.y});
			o.lon = latlon.lon;
			o.lat = latlon.lat;
		});

		// update object attributes per tick
		layer.selectAll("circle.node")
		     .attr("cx", function(d) { return d.x; })
		     .attr("cy", function(d) { return d.y; });
		
	});
}