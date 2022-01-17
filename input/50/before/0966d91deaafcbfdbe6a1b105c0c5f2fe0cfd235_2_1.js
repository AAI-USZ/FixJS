function loadScripts() {
	console.log('Loading scripts');
	for(a in APPS) {
	    value = APPS[a];
	    addScript('apps/'+value['name']+'/'+value['name']+'.js');
	}
}