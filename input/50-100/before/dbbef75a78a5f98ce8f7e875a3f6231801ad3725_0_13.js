function(displayObj) { if( displayObj === $_ ) return; {
	this.states = haxe.io.Bytes.alloc(32);
	this.jDoc = new $(displayObj != null?displayObj:js.Lib.document);
	this.jDoc.keydown($closure(this,"keyDownListener"));
	this.jDoc.keyup($closure(this,"keyUpListener"));
}}