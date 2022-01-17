function initialize_helper() {
	window.onhashchange = function() { load_url_code(); };

	if (typeof localStorage !== 'undefined') {
		if ( !localStorage.getItem('glslsandbox_user') ) {
			localStorage.setItem('glslsandbox_user', generate_user_id());
		}
	} else {
		// This fallback shouldn't be used by any browsers that are able to commit code.
		localStorage = { getItem: function(x) { return 'invalid_user'; } };
	}
}