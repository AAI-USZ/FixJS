function showAll(project) {

	// this doesn't seem to work at the moment with my indexProject

	//var bounds = project.activeLayer.bounds;

	var bounds = null;

	for (var ci in project.activeLayer.children) {

		var c = project.activeLayer.children[ci];

		var b = c.bounds;

		if (b) {

			if (bounds==null)

				bounds = b;

			else

				bounds = bounds.unite(b);

		}

	}

	if (bounds==null) {

		project.view.zoom = 1;

		project.view.center = new paper.Point(0,0);

	} else {

		var bw = bounds.width+MIN_SIZE;

		var bh = bounds.height+MIN_SIZE;

		var w = $(project.view._element).width();

		var h = $(project.view._element).height();

		var zoom = Math.min(MAX_ZOOM, w/bw, h/bh);

		console.log('showAll: bounds='+bw+','+bh+', canvas='+w+','+h+', zoom='+zoom+', bounds.center='+bounds.center);

		project.view.zoom = zoom;

		project.view.center = bounds.center;

	}

}