function(document) {

  // Onload, take the DOM of the page, get the markdown formatted text out and
	// apply the converter.
	var html = (new Showdown.converter()).makeHtml(document.body.innerText);
	document.body.innerHTML = html;

	// Also inject a reference to the default stylesheet to make things look nicer.
	var ss = document.createElement('link');
	ss.rel = 'stylesheet';
	ss.href = chrome.extension.getURL('markdown.css');
	document.head.appendChild(ss);

	// reload file. add by gyk001
	var nocache = document.createElement('meta');
	nocache['http-equiv']='cache-control';
	nocache['content'] = 'no-cache'
	document.head.appendChild(nocache);
	nocache = document.createElement('meta');
	nocache['pragma']='no-cache';
	document.head.appendChild(nocache);
	nocache = document.createElement('meta');
	nocache['expires']='-1';
	document.head.appendChild(nocache);
	
	
	
	setTimeout(function() {
	    location.reload();
        }, 3000);

}