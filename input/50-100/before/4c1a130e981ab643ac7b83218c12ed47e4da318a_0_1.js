function(state) {
	if( state === $_ ) return;
	game.Renderer.call(this,state);
}