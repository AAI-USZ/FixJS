function $viewsDelimiters(openChars, closeChars) {
		// Set the tag opening and closing delimiters. Default is "{{" and "}}"
		// openChar, closeChars: opening and closing strings, each with two characters

		if (!$views.rTag || arguments.length) {
			delimOpenChar0 = openChars ? "\\" + openChars.charAt(0) : delimOpenChar0; // Escape the characters - since they could be regex special characters
			delimOpenChar1 = openChars ? "\\" + openChars.charAt(1) : delimOpenChar1;
			delimCloseChar0 = closeChars ? "\\" + closeChars.charAt(0) : delimCloseChar0;
			delimCloseChar1 = closeChars ? "\\" + closeChars.charAt(0) : delimCloseChar1;

			// Build regex with new delimiters
			$views.rTag = rTag // make rTag available to JsViews (or other components) for parsing binding expressions
				//          tag    (followed by / space or })   or cvtr+colon or html or code
				= "(?:(?:(\\w+(?=[\\/\\s" + delimCloseChar0 + "]))|(?:(\\w+)?(:)|(>)|(\\*)))"
				//     params
				+ "\\s*((?:[^" + delimCloseChar0 + "]|" + delimCloseChar0 + "(?!" + delimCloseChar1 + "))*?)";

			//                                         slash or closeBlock           }}
			rTag = new RegExp(delimOpenChar0 + delimOpenChar1 + rTag + "(\\/)?|(?:\\/(\\w+)))" + delimCloseChar0 + delimCloseChar1, "g");

			// Default rTag:    tag      converter colon html code     params            slash   closeBlock
			//    /{{(?:(?:(\w+(?=[\/\s}
			rTmplString = new RegExp("<.*>|([^\\\\]|^)[{}]|" + delimOpenChar0 + delimOpenChar1 + ".*" + delimCloseChar0 + delimCloseChar1);
			// rTmplString looks for html tags or { or } char not preceeded by \\, or JsRender tags {{xxx}}. Each of these strings are considered NOT to be jQuery selectors
		}
		return [delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1];
	}
