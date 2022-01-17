function() {
	var component = this.component;
	if (component instanceof Echo.StreamServer.Controls.Stream) {
		this.addItemButton(this.assembleButton(this.component));
	} else if (component instanceof Echo.StreamServer.Controls.Submit) {
		this.extendTemplate(plugin.templates.cancel,"insertAfter", "postContainer");
		this.extendTemplate(plugin.templates.header, "replace", "header");
		
		this.extendRenderer("cancelButton", plugin.renderers.Submit.cancelButton);
		this.extendRenderer("author", plugin.renderers.Submit.author);
		this.extendRenderer("editedDate", plugin.renderers.Submit.editedDate);
		
		component.labels.set({
			"post": this.labels.get("post"),
			"posting": this.labels.get("posting")
		});
	}
}