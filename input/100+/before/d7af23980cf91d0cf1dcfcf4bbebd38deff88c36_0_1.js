function(tssFile) {
	var code, json, styles;

	if (path.existsSync(tssFile)) {
		var contents = fs.readFileSync(tssFile, 'utf8');
		if (!/^\s*$/.test(contents)) {
			try {
				code = exports.processTssFile(contents);
				json = JSON.parse(code);
				
				styles = sortStyles(json);
				optimizer.optimizeStyle(styles);
				//console.log(require('util').inspect(styles,false,null));
				return styles;
			} catch(E) {
				console.error(code);
				U.die("Error parsing style at "+tssFile.yellow+".  Error was: "+String(E).red);
			}
		}
	}

	return {};
}