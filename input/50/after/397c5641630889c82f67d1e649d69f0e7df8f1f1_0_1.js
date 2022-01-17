function() {
	try {
		Ajocado.XHRWrapperInjection.onreadystatechangeCallback.call(this);
	} finally {
		if (this.readyState == 4) {
			Ajocado.Page.RequestGuard.setRequestDone("XHR");
		}
	}
}