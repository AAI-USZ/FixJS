function makeSrcFile(path, srcDir, name) {
	if (JSDOC.opt.s) return;

	if (!name) {
		name = path.replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
		name = name.replace(/\:/g, "_");
	}

	var src = {path: path, name:name, charset: IO.encoding, hilited: ""};

	if (src.path in JsHilite.cache) {
		return; // already generated src code
	}
	else JsHilite.cache[src.path] = true;

	try {
		var sourceCode = IO.readFile(src.path);
	}
	catch(e) {
		print(e.message);
		quit();
	}
	if(path.indexOf("\\")) {
		var title = path.split("\\")[path.split("\\").length-1];
	} else {
		var title = path.split("/")[path.split("/").length-1];
	}
	var header = '<!DOCTYPE html>'+"\n"+
	'<html>'+"\n"+
	'<head>'+"\n"+
	'<meta charset="utf-8"></meta>'+"\n"+
	'<meta name="generator" content="JsDoc Toolkit"></meta>'+"\n"+
	'<title>'+title+'</title>'+"\n"+
	'<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>'+"\n"+
	'<meta name="mobileoptimized" content="0"></meta>'+"\n"+
	'<link rel="stylesheet" href="../../css/highlightJavascript.css" media="all"></link>'+"\n"+
	'<script src="../../javascript/highlightJavascript.min.js"></script>'+"\n"+
	'<style>'+"\n"+
	'body {margin:0;}'+"\n"+
	'</style>'+"\n"+
	'</head>'+"\n"+
	'<body>'+"\n"+
	'<pre>'+"\n"+
	'<code class="js">'+"\n";
	var footer = "</code></pre>\n<script>\nhighlightJavascript.format();\n</script>\n</body>\n</html>";
	var hilited = header+sourceCode+footer;
	IO.saveFile(srcDir, name+publish.conf.ext, hilited);
}