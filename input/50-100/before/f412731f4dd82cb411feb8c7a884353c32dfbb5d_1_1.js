function() {		
		var next = [], latest = [];
			
		collectEpisodes(anime, req.responseXML.getElementsByTagName('item'), next, latest);
		
		UI.list(next, el, '.next .torrent', { render: applyHref });
		UI.list(latest, el, '.latest .torrent', { render: applyHref });
		
		UI.removeCls(el, 'loading');
	}