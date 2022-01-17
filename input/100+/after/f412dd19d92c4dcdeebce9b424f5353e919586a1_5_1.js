function() {
	if("scrollX" in window) {
		return {x: window.scrollX, y: window.scrollY};
	} else {
		return {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop};
	}
}