function(url) {
	var q = url.split('?')[1];
	
	if(q[0] === '{' && q[q.length - 1] === '}') {
		return JSON.parse(decodeURI(q));
	} else {
		return qs.parse(parseUrl(url).query); 
	}
}