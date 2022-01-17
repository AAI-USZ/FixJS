function(toolbar, id, text, iconName) {

	var html = "<input type='checkbox' id='" + id + "' /><label for='" + id + "'>" + text + "</label>";

	this.addToolbarIcon(html, toolbar, id, text, iconName);

}