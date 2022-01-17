function() {
			return {
				hash: location.hash || "#" + self.initialFilePath,
				title: document.title,

				// persist across refresh
				initialHref: self.initialHref
			};
		}