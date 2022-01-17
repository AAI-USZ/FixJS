function() {
	try {
		return !!window.sessionStorage.getItem;
	} catch(e) {
		return false;
	}
}