function() {
	var app = WLMMobile.app;
	app.showPage( 'welcome-page' );
	app.showPage( 'country-page' );
	app.showPage( 'results-page' );
	app.showPage( 'map-page', null, true ); // switch to map via dropdown
	app.showPage( 'results-page', null, true );
	app.showPage( 'map-page', null, true );
	app.showPage( 'results-page', null, true );
	var prevPage = app.goBack();
	//var prevprevPage = app.goBack();
	strictEqual( prevPage, 'country-page', 'last page is country page (map not cached)' );
	//strictEqual( prevprevPage, 'welcome-page', 'page before is welcome' );
}