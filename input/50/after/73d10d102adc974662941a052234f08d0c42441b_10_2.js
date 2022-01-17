function () {
		if (!suppressUpdate && "viewController" in CSLEDIT) {
			CSLEDIT.viewController.styleChanged("formatCitations");
		}
	}