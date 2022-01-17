function(renderingTopLevelPage) {
	if (this === topLevelPages.none) {
		throw new Error('You cannot convert the [none] item to a menu item');
	}

	return {
		href: this.href,
		text: this.name,
		name: this.name,
		title: this.title,
		classes: this.activeIfEquals(renderingTopLevelPage)
	};
}