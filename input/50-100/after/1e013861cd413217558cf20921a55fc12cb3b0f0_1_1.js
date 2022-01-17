function(url) {
	var q = url.substr(url.indexOf('?') + 1);

  if(q) q = decodeURI(q);

	if(q[0] === '{' && q[q.length - 1] === '}') {
		return JSON.parse(q);
	} else {
		return qs.parse(parseUrl(url).query); 
	}
}