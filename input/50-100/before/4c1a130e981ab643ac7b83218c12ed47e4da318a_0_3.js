function(gamestate) {
	var g = gamestate.Get(this.Id());
	this.position_callback = function(p) {
		g.position = p;
	};
	this.size_callback = function(s) {
		g.size = s;
	};
	this.angle_callback = function(a) {
		g.angle = a;
	};
	this.registration_flag = true;
}