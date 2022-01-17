function(){
	var loginHref = '/maqetta/welcome';
	if(Runtime.singleUserMode()) {
		loginHref = '/maqetta/';
	}
	
	var dialog = new Dialog({
        title: webContent.sessionTimedOut
      //,  style: "width: 300px"
    });
	var message =  dojo.string.substitute(webContent.sessionTimedOutMsg, {hrefLoc: loginHref});
	dialog.set("content", message);
	dojo.connect(dialog, "onCancel", null, function(){window.location.href = loginHref;});
	setTimeout(function(){window.location.href=loginHref;}, 10000); // redirect to login in 10 sec
	dialog.show();
}