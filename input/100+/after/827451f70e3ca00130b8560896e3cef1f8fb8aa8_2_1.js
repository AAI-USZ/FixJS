function(json) {
	var objDepth = 0;
	var inString = false;
	var arrayDepth = 0;
	var sb = "";
	var len = json.length;
	var i = 0;
	for (i = 0; i < len; i++) {
		var c = json.charAt(i);
		switch (c) {
			case '{':
				if (!inString) sb += Color.MAGENTA;
				sb += c;
				if (!inString) sb += Color.COLOR_OFF;
				if (!inString) {
					sb += '\n';
					objDepth++;
					sb += this.printDepth(objDepth);
				}
				break;
			case '}':
				if (!inString) {
					sb += '\n';
					objDepth--;
					sb += this.printDepth(objDepth);
				}
				if (!inString) sb += Color.MAGENTA;
				sb += c;
				if (!inString) sb += Color.COLOR_OFF;
				break;
			case '\"':
				if (json.charAt(i-1) !== '\\') {
					if (!inString) {
						sb += Color.GREEN;
						sb += c;
					}
					else {
						sb += c;
						sb += Color.COLOR_OFF;
					}
					inString = ! inString;
				}
				else {
					sb += c;
				}
				break;
			case ',':
				if ( !inString && ( arrayDepth == 0 || json.charAt(i-1) == '}') ) {
					//sb += '\n');
					//printDepth(sb, objDepth);
					sb += Color.RED;
					sb += ',';
					sb += Color.COLOR_OFF;
					sb += '\n';
					sb += this.printDepth(objDepth);
				}
				else {
					sb += ',';
				}
				break;
			case '[':
				if (!inString) {
					arrayDepth++;
				}
				if (!inString) sb += Color.RED;
				sb += c;
				if (!inString) sb += Color.COLOR_OFF;
				break;
			case ']':
				if (!inString) {
					arrayDepth--;
				}
				if (!inString) sb += Color.RED;
				sb += c;
				if (!inString) sb += Color.COLOR_OFF;
				break;
			case ':':
				if (!inString && json.charAt(i-1) != ' ') {
					sb += '\t';
				}
				if (!inString) sb += Color.RED;
				sb += c;
				if (!inString) sb += Color.COLOR_OFF;
				if (!inString && json.charAt(i-1) != ' ') {
					sb += ' ';
				}
				break;
			
			default:
				sb += c;
		}
	}	return sb;
};
