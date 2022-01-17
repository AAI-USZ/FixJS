function friendlysharedCallbackChangeShared(e) {
	if( e.target.value === 'Shared IP edu' ) {
		e.target.form.contact.disabled = false;
	} else {
		e.target.form.contact.disabled = true;
	}
	e.target.form.organization.disabled=false;
	e.target.form.host.disabled=false;
}