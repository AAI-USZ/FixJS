function() {
	var attributes = {};
	if(this.classes) {
		attributes["class"] = this.classes.slice(0);
	}
	for(var t=0; t<this.content.length; t++) {
		this.content[t].execute(this.parents,this.tiddlerTitle);
	}
	return $tw.Tree.Element("div",attributes,this.content,{
		events: ["tw-navigate","tw-EditTiddler","tw-SaveTiddler","tw-CloseTiddler","tw-NavigateBack"],
		eventHandler: this
	});
}