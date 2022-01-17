function(){
	var thisNamespaceId = mw.config.get('wgNamespaceNumber');

	if ( thisNamespaceId === 2 /* User: */ || thisNamespaceId === 3 /* User talk: */ ) {
		return mw.config.get('wgTitle').split( '/' )[0];  // only first part before any slashes, to work on subpages
	}

	if ( thisNamespaceId === -1 /* Special: */ && mw.config.get('wgCanonicalSpecialPageName') === "Contributions" ) {
		return $('table.mw-contributions-table input[name="target"]')[0].getAttribute('value');
	}

	return false;
}