function () {
	var b = new BitArray();
	b.set(0, true);
	b.set(4, true);
	b.set(31, true);

	assert.equal(b.get(0), true, 'set(0, true).get(0)');
	assert.equal(b.get(4), true, 'set(4, true).get(4)');
	assert.equal(b.get(31), true, 'set(31, true).get(31)');
}