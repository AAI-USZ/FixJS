function getSharedViewModel(forSectionName) {
	return {
		navClasses: getNavClasses(forSectionName),
		sidebarLinks: getSidebarLinks(forSectionName)
	};
}