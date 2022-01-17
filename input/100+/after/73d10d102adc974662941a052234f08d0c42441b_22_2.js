function(cslCode) {
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
		}