function () {
	equal(CSLEDIT.schema.choices("layout/text").length, 4, "length");
	ok("macro" in CSLEDIT.schema.choices("layout/text")[0].attributes);
	ok("term" in CSLEDIT.schema.choices("layout/text")[1].attributes);
	ok("form" in CSLEDIT.schema.choices("layout/text")[1].attributes);
	ok("plural" in CSLEDIT.schema.choices("layout/text")[1].attributes);
	ok("value" in CSLEDIT.schema.choices("layout/text")[2].attributes);
	ok("variable" in CSLEDIT.schema.choices("layout/text")[3].attributes);
	ok("form" in CSLEDIT.schema.choices("layout/text")[3].attributes);

	// shouldn't have the choices in the normal nodes
	ok(!("macro" in CSLEDIT.schema.attributes("layout/text")));
}