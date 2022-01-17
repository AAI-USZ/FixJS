function() {		
		var next = [], latest = [];
			
		collectEpisodes(anime, req.responseXML.getElementsByTagName('item'), next, latest);
		
		UI.list(next, el, '.next .torrent', {});
		UI.list(latest, el, '.latest .torrent', {});
		
		UI.removeCls(el, 'loading');
	}