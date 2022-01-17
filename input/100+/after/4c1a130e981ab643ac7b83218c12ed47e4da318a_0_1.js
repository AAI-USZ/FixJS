function(p) {
	if( p === $_ ) return;
	var me = this;
	game.Game.call(this);
	this.game_renderer = new gamespec.GameSpecTestRenderer(this.game_state);
	this.game_state.Set("number",0);
	this.game_state.Set("attempts",0);
	this.game_state.Set("win",false);
	var btn = new game.GameObject(specfactory.GameFactory.GameObjectData());
	btn.Register(this.game_state);
	this.game_objects.push(new game.GameObject());
	this.interaction_manager.Register("mouseclick",function(e) {
		if(tools.Measure.PointInBox({ x : e.pageX + 0.0, y : e.pageY + 0.0},btn.Position(),btn.Size())) {
			var num = me.game_state.Get("number");
			me.game_state.Modify("number",num + tools.Random.OneOf([-1,1]));
		}
		me.logic_manager.Step();
	});
	this.logic_manager.AddRule(function(g) {
		if(g.Get("win") == true) dispatch.EventCannon.Fire(new gamedata.GameFinishEvent(true,10));
	});
	this.logic_manager.AddRule(function(g) {
		if(g.Get("number") == 10) g.Set("win",true);
	});
}