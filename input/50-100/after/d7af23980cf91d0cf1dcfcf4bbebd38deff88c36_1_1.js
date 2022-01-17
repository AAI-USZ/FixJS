function(view) {
			if (viewRegex.test(view)) {
				parseView(view, collection.dir, collection.manifest);
			}
		}