function(xhr){
		if (xhr.status == 401) {
			Trello.deauthorize();
			Trello.authorize(defaultOptions);
		} else {
			$("#view").html("<h1>Connection to Trello API is broken, Please <a href='javascript:window.reload();'>Reload</a></h1>");
		}
	}