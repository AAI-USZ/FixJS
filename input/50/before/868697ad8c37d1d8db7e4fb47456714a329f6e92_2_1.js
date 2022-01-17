function getTopLevelMenuItems(renderingTopLevelPage) {
	return _.chain(topLevelPages)
		.map(function (page) { return page.toTopLevelMenuItem(renderingTopLevelPage); })
		.value();
}