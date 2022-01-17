function afterAnimeRendered(anime, el) {
	convertPrefMatchers(anime);

	el.setAttribute('animeName', anime.name);
	
	var anidbUrl = 'http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search=' + escape(anime.name) + '&do.search=search';
	el.querySelector('.anidb').setAttribute('href', anidbUrl);
	
	el.className += ' loading';

	var req = new XMLHttpRequest();
	req.open('GET', 'http://www.nyaa.eu/?page=rss&cats=1_37&term=' + anime.name, true);
	req.onload = function() {		
		var next = [], latest = [];
			
		collectEpisodes(anime, req.responseXML.getElementsByTagName('item'), next, latest);
		
		UI.list(next, el, '.next .torrent', {});
		UI.list(latest, el, '.latest .torrent', {});
		
		UI.removeCls(el, 'loading');
	};
	req.send(null);
}