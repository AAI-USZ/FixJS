function() {
	hookSourceViews();
	hookDebuggingToggle();
	hookQuickSearch();
	highlightLocationTarget();

	$('ul.link-list a').bind( "click", highlightClickTarget );
}