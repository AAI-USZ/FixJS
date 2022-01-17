function(color, colorAlpha){
	return new Kinetic.Polygon({
		points : [0,16, 3,14, 3,8, 6,8, 8,14, 13,14, 13,0, 16,2, 16,14, 23,14, 26,16, 28,16, 26,16, 23,18, 16,18, 16,30, 13,32, 13,18, 8,18, 6,24, 3,24, 3,18 ],
		fill: colorAlpha,
		stroke: color,
		strokeWidth: 1,
		scale: 1,
		offset: [13,16]
	});
}