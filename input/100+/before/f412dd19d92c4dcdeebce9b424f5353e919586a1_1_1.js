function() {
	// Reset the record of the previous history stack
	this.prevHistory = {stack: []};
	// Instantiate the story view
	var storyviewName;
	if(this.hasParameter("storyviewTiddler")) {
		storyviewName = this.wiki.getTextReference(this.params.storyviewTiddler);
	}
	if(!storyviewName && this.hasParameter("storyview")) {
		storyviewName = this.params.storyview;
	}
	var StoryView = this.wiki.macros.story.viewers[storyviewName];
	if(StoryView) {
		this.storyview = new StoryView(this);
	}
	if(!this.storyview) {
		StoryView = this.wiki.macros.story.viewers.classic;
		if(StoryView) {
			this.storyview = new StoryView(this);
		}
	}
}