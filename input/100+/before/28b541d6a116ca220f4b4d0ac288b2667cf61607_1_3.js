function() {
	expect(4);

	t( "Comma Support", "h2, #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2 , #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2 , #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2,#qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
}