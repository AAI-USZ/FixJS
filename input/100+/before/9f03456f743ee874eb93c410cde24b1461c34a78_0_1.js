function(array,expected,pos) {
	var flag = false;
	var _g = 0;
	while(_g < array.length) {
		var given = array[_g];
		++_g;
		if(given == expected) {
			flag = true;
			break;
		}
	}
	if(!flag) {
		haxe.Log.trace("Expected " + array.toString() + " to contain ",pos);
		haxe.Log.trace(expected,pos);
	}
	this.assertTrue(flag,pos);
}