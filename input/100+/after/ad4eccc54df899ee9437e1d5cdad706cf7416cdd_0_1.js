function(translate, translators, test, testDoneCallback) {
	if(!translators.length) {
		testDoneCallback(this, test, "failed", "Detection failed");
		return;
	} else if(this.type === "web" && translators[0].itemType !== "server"
			&& (translators[0].itemType !== "multiple" && test.items.length > 1 ||
			test.items.length === 1 && translators[0].itemType !== test.items[0].itemType)) {
				// this handles "items":"multiple" too, since the string has length 8
		testDoneCallback(this, test, "failed", "Detection returned wrong item type");
		return;
	}
	
	translate.setTranslator(this.translator);
	translate.translate(false);
}