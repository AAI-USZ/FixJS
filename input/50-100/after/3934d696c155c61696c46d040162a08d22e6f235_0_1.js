function () {
	if (!Trello.authorized()) return Trello.authorize(defaultOptions);
	Trello.get('/members/me',{boards:"open",organizations:"all"}, function(me) {
		window.myself=me;
		router();
	},function(xhr){
		if (xhr.status == 401) {
			Trello.deauthorize();
			Trello.authorize(defaultOptions);
		} else {
			$("#view").html("<h1>Connection to Trello API is broken, Please <a href='javascript:window.reload();'>Reload</a></h1>");
		}
	});
}