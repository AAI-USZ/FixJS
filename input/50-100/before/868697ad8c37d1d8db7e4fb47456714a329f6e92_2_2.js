function(renderingTopLevelPage) {
	return {
		href: this.href,
		text: this.name,
		name: this.name,
		title: this.title,
		classes: this.activeIfEquals(renderingTopLevelPage)
	};
}