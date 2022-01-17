function getSidebarLinks(forSectionName) {
	return [{ href: '/', text: 'Home', active: activeIfEquals('Home', forSectionName)},
		{ href: '/about', text: 'About', active: activeIfEquals('About', forSectionName)},
		{ href: '/reading', text: 'Reading', active: activeIfEquals('Reading', forSectionName)},
		{ href: '/twitter', text: 'Twitter', active: activeIfEquals('Twitter', forSectionName)}];
}