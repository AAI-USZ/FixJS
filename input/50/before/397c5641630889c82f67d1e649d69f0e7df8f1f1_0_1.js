function() {
	if (this.readyState == 4) {
		Ajocado.Page.RequestGuard.setRequestDone("XHR");
	}
	Ajocado.XHRWrapperInjection.onreadystatechangeCallback.call(this);
}