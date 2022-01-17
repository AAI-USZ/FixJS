function () {
	equal(CSLEDIT.schema.choices("layout/text").length, 4, "length");
	ok("macro" in CSLEDIT.schema.choices("layout/text")[0]);
	ok("term" in CSLEDIT.schema.choices("layout/text")[1]);
	ok("form" in CSLEDIT.schema.choices("layout/text")[1]);
	ok("plural" in CSLEDIT.schema.choices("layout/text")[1]);
	ok("value" in CSLEDIT.schema.choices("layout/text")[2]);
	ok("variable" in CSLEDIT.schema.choices("layout/text")[3]);
	ok("form" in CSLEDIT.schema.choices("layout/text")[3]);

	// shouldn't have the choices in the normal nodes
	ok(!("macro" in CSLEDIT.schema.attributes("layout/text")));
}