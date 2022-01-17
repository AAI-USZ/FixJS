function() {
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "Logs/timeline_data", false);
    xhr.send(null);
    if(xhr.status == 200) {
    	var data = JSON.parse(xhr.responseText);
        WebInspector.timelinePanel._model.reset();
        WebInspector.timelinePanel._model._loadNextChunk(data, 1);
    }
}