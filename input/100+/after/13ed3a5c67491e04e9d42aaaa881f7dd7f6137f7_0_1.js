function(){
	  if(gBrowser.currentURI.spec != "about:blank")
	    return;
    gBrowser.contentDocument.documentElement.focus();
  	window.focusAndSelectUrlBar()
  }