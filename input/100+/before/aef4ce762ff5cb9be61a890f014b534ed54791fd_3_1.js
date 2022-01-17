function () {
		var styleAttributes = CSLEDIT.schema.attributes("root/style"),
			index;

		ok("default-locale" in styleAttributes);
		equal(styleAttributes["default-locale"].values.length, 1);
		equal(styleAttributes["default-locale"].values[0].type, "data");
		equal(styleAttributes["default-locale"].values[0].value, "language");

		equal(styleAttributes["delimiter-precedes-et-al"].values[0].value, "contextual");
		equal(styleAttributes["delimiter-precedes-et-al"].defaultValue, "contextual");
		
		ok("font-weight" in CSLEDIT.schema.attributes("layout/text"));
	}