function (strSentence) {
			return strSentence.toLowerCase().replace(/\b[a-z]/g, convertToUpper);
		 
			function convertToUpper() {
				return arguments[0].toUpperCase();
			}
		}