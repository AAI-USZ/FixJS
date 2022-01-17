function(value) {	
	var index = $(":text").length;

	var fieldset = $('fieldset');
	var controlGroup = $("<div>").addClass("control-group");
	var label = $("<label>").addClass("control-label")
													.attr("for", "pragma_" + index)
													.html("Value");

	var controls = $("<div>").addClass("controls");
	var input = $("<input>").addClass("text_field")
													.attr("id", "pragma_" + index)
													.attr("name", "pragma_" + index)
													// .attr("size", "20")
													.attr("type", "text")
													.attr('value', value);

	controlGroup.appendTo(fieldset);
	label.appendTo(controlGroup);
	controls.appendTo(controlGroup);
	input.appendTo(controls);	
}