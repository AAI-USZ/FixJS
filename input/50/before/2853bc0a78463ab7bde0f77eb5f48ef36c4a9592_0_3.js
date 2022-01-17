function gotoMemoryLocation(location) {
	$("#memory_container").scrollTop(Math.floor(location / 8) * LINE_HEIGHT);
	updateMemoryWindow();
}