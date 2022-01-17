function() {
	try {
		window.localStorage.setItem(npf.userAgent.Support.MOD, npf.userAgent.Support.MOD);
		window.localStorage.removeItem(npf.userAgent.Support.MOD);

		return true;
	} catch(e) {
		return false;
	}
}