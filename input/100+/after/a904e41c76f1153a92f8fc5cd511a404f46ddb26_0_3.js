function() {
	var div = $("#form-update-event");
	var inputs = div.find("input");
	var obj = serializeObject(inputs);
	var action = "update";
	if (obj.id == "") {
		action= "save";
	}
	var txt = {
		event : JSON.stringify(obj)
	};

	$.ajax({
		cache : false,
		type : "POST",
		async : false,
		data : txt,
		dataType : "jsonp",
		url : serverUrl + '/event/' + action,
		success : function(data) {
			if (action == "save") {
				addEventOnSection(data);
				$('#list-events').listview('refresh');
			} else {
				var event = $("#section-events").data('Event_' + data.id);
				$(event).trigger("refresh-event"+ data.id + "-list", data);
			}
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});

}