function(forSectionName) {
	return {
		navClasses: getNavClasses(forSectionName),
		sidebarLinks: getSidebarLinks(forSectionName),
	};
}