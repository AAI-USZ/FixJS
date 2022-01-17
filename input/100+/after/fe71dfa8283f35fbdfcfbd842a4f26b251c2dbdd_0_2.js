function highlightLocationTarget() {
	console.debug( "Location hash: %s", window.location.hash );
	if ( ! window.location.hash || window.location.hash.length == 0 ) return;

	var anchor = window.location.hash.substring(1);
	console.debug( "Found anchor: %s; matching %s", anchor, "a[name=" + anchor + "]" );

	highlightTarget( anchor );
}