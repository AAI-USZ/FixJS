function () {
	equal(CSLEDIT.schema.choices("layout/text")[3].attributes["variable"].list, false);
	equal(CSLEDIT.schema.choices("choose/if")[6].attributes["variable"].list, true);
}