function(values) {
	var len = values.length;
	var numVF = len / 3;
	len = Math.floor(numVF);
	if(len != numVF) {
		haxe.Log.trace("Invalid push vertices. Values not divisible by 3!",{ fileName : "Geometry.hx", lineNumber : 44, className : "a3d.Geometry", methodName : "pushVertices"});
		return;
	}
	this.numVertices += len;
	len = values.length;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.vertices.push(values[i]);
		}
	}
}