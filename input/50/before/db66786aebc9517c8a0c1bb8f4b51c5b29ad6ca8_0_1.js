function redraw(ps) {

	for (var vi in ps.views) {

		var v = ps.views[vi];

		v.draw();

	}

}