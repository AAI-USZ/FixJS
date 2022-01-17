function(url){
		url = elgg.parse_url(url);
		if(url.scheme){
			url.scheme = url.scheme.toLowerCase();
		}
		if(url.scheme == 'http' || url.scheme == 'https') {
			if(!url.host) {
				return false;
			}
			/* hostname labels may contain only alphanumeric characters, dots and hypens. */
			if(!(new RegExp("^([a-zA-Z0-9][a-zA-Z0-9\\-\\.]*)$", "i")).test(url.host) || url.host.charAt(-1) == '.'){
				return false;
			}
		}
		/* some schemas allow the host to be empty */
		if (!url.scheme || !url.host && url.scheme != 'mailto' && url.scheme != 'news' && url.scheme != 'file') {
			return false;
		}
		return true;
	}