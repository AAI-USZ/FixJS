function validatePosition(context, position, xMin, xMax, yMin, yMax) {
	assert.ok(position, "no position provided to " + context);
	assert.ok(typeof position === 'object', context + " position must be an object e.g. { x: 1, y: 3 }");
	assert.ok(typeof position.x === 'number', "non-numeric x position provided to " + context);
	assert.ok(typeof position.y === 'number', "non-numeric x position provided to " + context);
	assert.ok(position.x >= xMin && position.x < xMax, "invalid x position provided to " + context);
	assert.ok(position.y >= yMin && position.y < yMax, "invalid x position provided to " + context);
}