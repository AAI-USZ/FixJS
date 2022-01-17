function(button) {
	var buttons = this.component.config.get("itemButtons." + name, []);
	this.component.config.set("itemButtons." + name, buttons.concat(button));
}