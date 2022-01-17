function getEvents() {
	$.ajax({
		cache : false,
		type : "GET",
		async : false,
		dataType : "jsonp",
		url : 'http://localhost:8080/TheEvent/event/list',
		success : function(data) {
			if (data) {
				var eventList = new EventList();
				eventList.add(data);
				eventList.renderToHtml();
			}
		},
		error : function(xhr) {
			alert(xhr.responseText);
		}
	});
}