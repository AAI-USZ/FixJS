function(src) {
		if (src.path in JsHilite.cache) {
			return; // already generated src code
		} else JsHilite.cache[src.path] = true;

		try {
			var sourceCode = IO.readFile(src.path);
		} catch (e) {
			print(e.message);
			quit();
		}
		var header = '<!DOCTYPE html>' + "\n" + '<html>' + "\n" + '<head>' + "\n" + '<meta charset="utf-8"></meta>' + "\n" + '<meta name="generator" content="JsDoc Toolkit"></meta>' + "\n" + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>' + "\n" + '<meta name="mobileoptimized" content="0"></meta>' + "\n" + '<style>' + "\n" + base64_decode(css) + "\n" + "</style>" + "\n" + "<script>" + "\n" + base64_decode(js) + "\n" + "</script>" + "\n" + "</head>" + "\n" + "<body>" + "\n" + "<pre>" + "\n" + "<code class=\"js\">" + "\n";
		var footer = "</code>" + "\n" + "</pre>" + "\n" + "<script>" + "\n" + "highlightJavascript.format();" + "\n" + "</script>" + "\n" + "</body>" + "\n" + "</html>";
		src.hilited = header + sourceCode + footer;
	}