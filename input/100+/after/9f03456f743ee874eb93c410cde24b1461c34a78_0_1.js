function(a,b,pos) {
	if(a.length != b.length) this.assertTrue(false,pos);
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var k = _g1++;
		this.assertEquals(a[k],b[k],pos);
	}
}