function(displayObj) {
	if( displayObj === $_ ) return;
	this.states = haxe.io.Bytes.alloc(32);
	this.jDoc = displayObj != null?displayObj:js.Lib.document;
	this.jDoc.onkeydown = $closure(this,"keyDownListener");
	this.jDoc.onkeyup = $closure(this,"keyUpListener");
}