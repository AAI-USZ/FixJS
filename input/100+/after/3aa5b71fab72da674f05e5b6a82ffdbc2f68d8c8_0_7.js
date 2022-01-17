function sanitize_link(link, skip_params) {
    if (!link) { return; }
    var parts = link.split('?');
    if (!parts[1]) { return link; }
    var keyvals = parts[1].split('&');
    var pairs = new Array();
    for(var x=0; x<keyvals.length; x++) {
	var pair = keyvals[x].split('=');
	if (skip_params) {
	    var skip_it = false;
	    for(var y=0; y<skip_params.length; y++) {
		if (pair[0] == skip_params[y]) {
		    skip_it = true;
		}
	    }
	    if (skip_it) { continue; }
	}
	pairs.push(pair[0] + '=' + pair[1]);
    }
    return parts[0] + '?' + pairs.sort().join('&');
}