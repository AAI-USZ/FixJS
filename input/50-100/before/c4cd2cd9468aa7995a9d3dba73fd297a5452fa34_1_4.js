function() {
	try {
		return !!window.localStorage.getItem;
	} catch(e) {
		return false;
	}
}