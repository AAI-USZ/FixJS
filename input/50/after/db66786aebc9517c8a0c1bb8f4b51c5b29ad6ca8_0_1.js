function redraw(ps) {

	for (var vi in ps.View._views) {

		var v = ps.View._views[vi];

		if (ps===v._scope)

			v.draw();

	}

}