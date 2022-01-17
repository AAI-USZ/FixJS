function () {
	var cslData,
		jsTreeData,
		cslXml;

	cslData = CSLEDIT.cslParser.cslDataFromCslCode(CSLEDIT.test_cslJSON.cslFragment, {index : 0});

	equal(cslData.name, "style");
	equal(cslData.children.length, 1);
	equal(cslData.children[0].name, "citation");
	equal(cslData.children[0].attributes.length, 9);
	equal(cslData.children[0].attributes[0].key, "et-al-min");
	equal(cslData.children[0].attributes[0].value, 6);
	equal(cslData.children[0].attributes[0].enabled, true);

	// check that it converts back to CSL XML without changes
	cslXml = CSLEDIT.cslParser.cslCodeFromCslData(cslData);

	// remove whitespace after closing tags
	cslXml = cslXml.replace(/>[\n\r\s]*/g, ">");
	equal(cslXml, CSLEDIT.test_cslJSON.cslFragment);
}