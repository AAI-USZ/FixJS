function loadScripts() {
	console.log('Loading scripts');
	for(a in APPS) {
	    value = APPS[a];
	    head.js('apps/'+value['name']+'/'+value['name']+'.js')
	    //addScript('apps/'+value['name']+'/'+value['name']+'.js');
	}
}