function getTopLevelMenuItems(forSectionName) {
	return [{ href: '/', text: 'Home', classes: activeIfEquals('home', forSectionName)},
		{ href: '/about', text: 'About', classes: activeIfEquals('about', forSectionName)},
		{ href: '/reading', text: 'Reading', classes: activeIfEquals('reading', forSectionName)},
		{ href: '/twitter', text: 'Twitter', classes: activeIfEquals('twitter', forSectionName)},
		{ href: 'http://github.com/adamchester/gistblog-express', text: 'Github', classes: ''}];
}