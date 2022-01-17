function Passage(passageContainer, rawServerVersions, passageId) {

	var self = this;

	this.container = passageContainer;

	this.version = $(".passageVersion", passageContainer);

	this.reference = $(".passageReference", passageContainer);

	this.passage = $(".passageContent", passageContainer);

	this.bookmarkButton = $(".bookmarkPassageLink", passageContainer);

	this.previousChapter = $(".previousChapter", passageContainer);

	this.nextChapter = $(".nextChapter", passageContainer);

	this.continuousPassage = $(".continuousPassage", passageContainer);

	this.scrolling = false;

	this.forceRefresh = false;

	this.passageId = passageId;

	this.passageSync = false;

	

	this.getBefore = false;

	this.getAfter = false;

	

	// read state from the cookie

	this.setInitialPassage();

	

	this.initVersionsTextBox(rawServerVersions);

	this.initReferenceTextBox();

	

	//this is so that when we click a word, it highlights it

//	this.passage.click(function(e) {

//		var clickedWord = getWordAtPoint(this, e.pageX, e.pageY);

//		var lookup = clickedWord.replace(/[ ,.;:"]/g, "");

//		

//		$.shout("show-all-strong-morphs", { displayedWord: lookup } );

//		

//	});

	

	

	

	// register to listen for events that click a word/phrase:

	this.passage.hear("show-all-strong-morphs", function(selfElement, data) {

		self.higlightStrongs(data);

	});

	

	// register we want to be notified of menu option changes...

	this.passage.hear("toolbar-menu-options-changed-" + this.passageId, function(selfElement, data) {

			self.changePassage();

	});



	// register when we want to be alerted that a bookmark has changed

	this.passage.hear("new-passage-" + this.passageId, function(selfElement, data) {

		self.reference.val(data);

		self.changePassage();

	});



	// register when we want to be alerted that a bookmark has changed

	this.passage.hear("show-preview-" + this.passageId, function(selfElement, previewData) {

		self.showPreview(previewData);

	});

	

	

	this.passage.hear("version-list-refresh", function(selfElement, versions) {

		self.refreshVersionsTextBox(versions);

	});

	

	this.bookmarkButton.hear("bookmark-passage-" + this.passageId, function(selfElement, data) {

		self.bookmarkButton.click();

	});

	

	this.passage.hear("sync-passage-activated", function(selfElement, data) {

		self.doSync();

	});

	

	this.passage.hear("sync-passage-deactivated", function(selfElement, data) {

		self.deSync();

	});



	this.bookmarkButton

		.button({ icons: {primary: "ui-icon-bookmark" }, text: false})

		.click(function() {

			$.shout("bookmark-addition-requested", { reference: self.reference.val() });

	});

	



	this.previousChapter

		.button({ icons: {primary: "ui-icon-arrowreturnthick-1-w" }, text: false})

		.click(function() {

			$.getSafe(BIBLE_GET_PREVIOUS_CHAPTER + self.reference.val() + "/" + self.version.val(), function(newReference) {

				self.changePassage(newReference, function() {

					self.passage.scrollTop(self.passage.prop("scrollHeight") - self.passage.height());	

				});

			});

	});



	this.nextChapter

		.button({ icons: {primary: "ui-icon-arrowreturnthick-1-w" }, text: false})

		.click(function() {

			$.getSafe(BIBLE_GET_NEXT_CHAPTER + self.reference.val() + "/" + self.version.val(), function(newReference) {

				self.changePassage(newReference, function() {

					self.passage.scrollTop(0);

				});

			});

	});

	

	this.continuousPassage

		.button({ icons: { primary: "ui-icon-script" }, text: false })

		.click(function() {

			self.handleContinuousPassage();

		});

}