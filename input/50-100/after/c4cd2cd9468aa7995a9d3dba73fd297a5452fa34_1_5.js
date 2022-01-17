function() {
	try {
		window.sessionStorage.setItem(npf.userAgent.Support.MOD, npf.userAgent.Support.MOD);
		window.sessionStorage.removeItem(npf.userAgent.Support.MOD);

		return true;
	} catch(e) {
		return false;
	}
}