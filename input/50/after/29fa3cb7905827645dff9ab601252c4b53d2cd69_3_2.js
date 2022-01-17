function getNavClasses(forSectionName) {
	return {
		home: activeIfEquals('home', forSectionName),
		about: activeIfEquals('about', forSectionName),
		twitter: activeIfEquals('twitter', forSectionName),
		reading: activeIfEquals('reading', forSectionName)
	};
}