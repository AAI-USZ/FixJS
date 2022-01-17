function gotoMemoryLocation(location) {
	var val = parseInt(location);
	if(isNaN(val)) return;
	$("#memory_container").scrollTop(Math.floor(val / 8) * LINE_HEIGHT);
	updateMemoryWindow();
}