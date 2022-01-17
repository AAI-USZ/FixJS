function(selfElement, data) {

		self.passageId = data.passageId;

		self.active = true;

		self.linkToPassage = true;

		

		// first show the bottom pane...

		if(!this.initialised) {

			self.initAndLoad();

		} else {

			self.onLoad();

		}

				

		$(window).resize(self.onResize);

	}