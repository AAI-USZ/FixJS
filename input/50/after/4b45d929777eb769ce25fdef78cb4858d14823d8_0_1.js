function() {
			return {
				hash: $.mobile.path.parseUrl( location.href ).hash || "#" + self.initialFilePath,
				title: document.title,

				// persist across refresh
				initialHref: self.initialHref
			};
		}