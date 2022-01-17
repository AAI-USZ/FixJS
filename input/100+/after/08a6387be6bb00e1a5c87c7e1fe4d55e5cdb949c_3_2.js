function() {
	var component = this.component;
	
	this.extendTemplate(plugin.templates.cancel,"insertAfter", "postContainer");
	this.extendTemplate(plugin.templates.header, "replace", "header");
		
	this.extendRenderer("text", plugin.renderers.Submit.text);
	this.extendRenderer("author", plugin.renderers.Submit.author);
	this.extendRenderer("editedDate", plugin.renderers.Submit.editedDate);
	this.extendRenderer("cancelButton", plugin.renderers.Submit.cancelButton);
		
	component.labels.set({
		"post": this.labels.get("post"),
		"posting": this.labels.get("posting")
	});
}