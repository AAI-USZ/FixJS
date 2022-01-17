function() {	
	var fieldset = $('fieldset');
	var controlGroup = $("<div>").addClass("control-group");
	var label = $("<label>").addClass("control-label")
													.attr("for", "pragma_" + this.pragmas.length)
													.html("Value");

	var controls = $("<div>").addClass("controls");
	var input = $("<input>").addClass("text_field")
													.attr("id", "pragma_" + this.pragmas.length)
													.attr("name", "pragma_" + this.pragmas.length)
													.attr("size", "30")
													.attr("type", "text");

	controlGroup.appendTo(fieldset);
	label.appendTo(controlGroup);
	controls.appendTo(controlGroup);
	input.appendTo(controls);	

	this.pragmas.push("");
}