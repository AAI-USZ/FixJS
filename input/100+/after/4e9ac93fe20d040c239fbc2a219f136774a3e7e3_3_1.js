function TimelineWidget(rootElement, passages) {

	this.rootElement = rootElement;

	this.passages = passages;

	this.initialised = false;

	this.active = false;

	this.currentEvents = {};

	

	var self = this;



	// register the "show-timeline" event

	$(rootElement).hear("show-timeline", function(selfElement, data) {

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

	});

	

	$(rootElement).hear("passage-changed", function(selfElement, data) {

		if(self.initialised && self.linkToPassage) {

			self.onLoad();

		}

	});	

}