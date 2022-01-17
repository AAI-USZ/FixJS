function getLocalstorage(key, title){
    	var localstore = localStorage[key];
    	$("link[title=" +title + "]").attr("href", localstore);
    	showWelcomeImage(key);
    }