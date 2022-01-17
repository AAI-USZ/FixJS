function () {
	var parseStyleList = function (styleList) {
		var style = styleList.pop();

		$.get(CSLEDIT.options.get("rootURL") + "/external/csl-styles/" + style, {}, function(cslCode) {
			var domParser = new DOMParser,
				xmlDom = domParser.parseFromString(cslCode, "application/xml"),
				initialXmlElement = $('<div/>').append(xmlDom.documentElement),
				cslData = CSLEDIT.cslParser.cslDataFromCslCode(cslCode),
				processedCslCode = CSLEDIT.cslParser.cslCodeFromCslData(cslData, null, true),
				initialXmlString;

			// strip comments from inital XML (node type 8)
			initialXmlElement.find('*').each(function() {
				if(this.nodeType == 8) {
					$(this).remove();
				}
			});
			initialXmlString = '<?xml version="1.0" encoding="utf-8"?>\n' + initialXmlElement.html();
			// remove any lines with comments
			initialXmlString = initialXmlString.replace(/.*<!--.*-->.*/g, "") + "\n";

			// remove whitespace from start of every line to normalise
			initialXmlString = initialXmlString.replace(/\n\s*/g, "\n");
			processedCslCode = processedCslCode.replace(/\n\s*/g, "\n");

			equal(processedCslCode, initialXmlString, "parsed " + style);

			if (styleList.length === 0) {
				start();
			} else {
				parseStyleList(styleList);
			}
		});
	};

	parseStyleList([
		'apa.csl',
		'ieee.csl',
		'harvard1.csl',
		'nature.csl',
		'american-medical-association.csl',
		'chicago-author-date.csl',
		'apsa.csl',
		'vancouver.csl',
		'asa.csl',
		'mla.csl',
		'mhra.csl',
		//'chicago-fullnote-bibliography.csl', // has an empty <if></if> over two lines
		'associacao-brasileira-de-normas-tecnicas.csl',
		'chicago-note-bibliography.csl',
		'american-chemical-society.csl',
		'cell.csl',
		'science.csl',
		'elsevier-with-titles.csl',
		'ecology.csl',
		'elsevier-harvard.csl',
		'royal-society-of-chemistry.csl',
		'pnas.csl'
	]);
}