function(p) {
	if( p === $_ ) return;
	novel.Scene.call(this);
	this.scenes = [];
	this.buttons = new Hash();
}