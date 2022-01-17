function () {
	equal(CSLEDIT.schema.choices("layout/text")[3]["variable"].list, false);
	equal(CSLEDIT.schema.choices("choose/if")[6]["variable"].list, true);
}