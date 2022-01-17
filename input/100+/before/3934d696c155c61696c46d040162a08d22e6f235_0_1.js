function(){
	console=console || {};
	console.log=console.log || function(){};
	console.error=console.error || function(){};
	if (!console.error) {console.log = function() {};}
	var defaultOptions = {
        scope: {
            write: false
        },
        success: onAuthorize
    };
	if(typeof Trello==="undefined") {
		$("#view").html("<h1>Connection to Trello API is broken, Please <a href='javascript:window.reload();'>Reload</a></h1>");
	}

	Trello.authorize(_.extend({}, defaultOptions, {// Authentication
        interactive: false
    }));

    if (!Trello.authorized()) {
        return Trello.authorize(defaultOptions);
    }

    function onAuthorize() {
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

	$(window).bind("hashchange",router);
}