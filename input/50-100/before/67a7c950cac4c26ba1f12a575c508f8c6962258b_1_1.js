function testDoc (xmlDoc) {

	testeee = (new XMLSerializer()).serializeToString(xmlDoc);

	if (testeee.indexOf("<parsererror") != -1) {

		console.log('>>> parse error in xml doc');

	}

}