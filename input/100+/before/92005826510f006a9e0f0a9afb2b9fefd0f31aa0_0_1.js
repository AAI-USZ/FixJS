function(target) {
			if (target.path) {
				node = target;
				path = target.path;
			} else {
				path = target;
			}

			if (node) {
				muze.ariadne.explore.tree.view(node);
			} else {
				muze.ariadne.explore.tree.view(path);
			}

			muze.ariadne.explore.sidebar.view(path);
			muze.ariadne.explore.viewpane.view(path);
			muze.ariadne.explore.browseheader.view(path);
			muze.ariadne.registry.set('path', path);
		}