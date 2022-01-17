function () {
	CSLEDIT.schema = CSLEDIT.Schema();
	CSLEDIT.schema.callWhenReady( function () {
		ok(true, "schema ready");
		start();
	});
}