function(g) {
	if( g === $_ ) return;
	game.Renderer.call(this,g);
	var scr_data = specfactory.BuildingBlocksFactory.TextData();
	scr_data.raw_text = g.Get("number") + "";
	scr_data.position = { x : 50.0, y : 50.0};
}