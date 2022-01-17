function createEvent() {
	var div = $("#form-update-event");
	var inputs = div.find("input");
	$.each(inputs, function (index, element) {
		$(element).val("");
	});
	$("#delete-event").hide();
}