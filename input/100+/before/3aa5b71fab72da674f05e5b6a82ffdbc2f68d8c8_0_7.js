function sanitize_link(link) {
    if (!link) { return; }
    var parts = link.split('?');
    if (!parts[1]) { return link; }
    var keyvals = parts[1].split('&');
    var pairs = new Array();
    for(var x=0; x<keyvals.length; x++) {
	var pair = keyvals[x].split('=');
	if (
	    pair[0] == 'comment_id' || 
	    pair[0] == 'offset' ||
	    pair[0] == 'total_comments'
	) { continue; }
	pairs.push(pair[0] + '=' + pair[1]);
    }
    return parts[0] + '?' + pairs.sort().join('&');
}