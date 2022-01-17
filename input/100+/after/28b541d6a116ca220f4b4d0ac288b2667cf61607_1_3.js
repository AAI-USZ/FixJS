function() {
	expect(6);

	t( "Comma Support", "h2, #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2 , #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2 , #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2,#qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2,#qunit-fixture p ", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
	t( "Comma Support", "h2\t,\r#qunit-fixture p\n", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
}