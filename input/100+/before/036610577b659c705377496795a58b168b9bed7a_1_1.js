function(color, colorAlpha){
	// Special case since this tank has a few different shapes...
	var group = new Kinetic.Group({
		x: 0,
		y: 0,
		offset: [8, 14]
	});

	// Body
	var bodyShape = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: 28,
		height: 16,
		fill: colorAlpha,
		stroke: color,
		strokeWidth: 1,
	});

	// Roof
	var roofShape = new Kinetic.Rect({
		x:0,
		y:0,
		width: 16,
		height: 16,
		fill: colorAlpha,
		stroke: color,
		strokeWidth: 1
	});

	// Hood
	var hoodShape = new Kinetic.Line({
		points : [16,5,28,4,28,12,16,11],
		stroke: color,
		strokeWidth : "1"
	});

	var plusShape = new Kinetic.Star({ // Lol hack
		x:8,
		y:8,
		numPoints:4,
		innerRadius:0,
		outerRadius:8,
		fill:"white",
		stroke : "white",
		strokeWidth : "4"
	});	

	group.add(bodyShape);
	group.add(roofShape);
	group.add(hoodShape);
	group.add(plusShape);

	return group;
}