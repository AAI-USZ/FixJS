function(page) {
	var act = this.actions[page];
	var old_act = this.actions[this.active_scene];
	this.slides.get(old_act).Hide();
	this.slides.get(act).Show();
	this.active_scene = page;
}