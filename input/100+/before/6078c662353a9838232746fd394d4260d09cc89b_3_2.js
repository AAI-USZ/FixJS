function(tmpl, c, def) {
		c = c || doT.templateSettings;
		var cstart = c.append ? "'+(" : "';out+=(", // optimal choice depends on platform/size of templates
		    cend   = c.append ? ")+'" : ");out+='";
		var str = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;

		str = ("var out='" +
			((c.strip) ? str.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g, ''): str)
			.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(c.interpolate, function(match, code) {
				return cstart + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ') + cend;
			})
			.replace(c.encode, function(match, code) {
				return cstart + code.replace(/\\'/g, "'").replace(/\\\\/g, "\\").replace(/[\r\t\n]/g, ' ') + ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('" + '"' + "').join('&#34;').split(" + '"' + "'" + '"' + ").join('&#39;').split('/').join('&#47;'" + cend;
			})
			.replace(c.conditionalEnd, function(match, expression) {
				return "';}out+='";
			})
			.replace(c.conditionalStart, function(match, expression) {
				var code = "if(" + expression + "){";
				return "';" + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ')  + "out+='";
			})
			.replace(c.evaluate, function(match, code) {
				return "';" + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ') + "out+='";
			})
			+ "';return out;")
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t')
			.replace(/\r/g, '\\r')
			.split("out+='';").join('')
			.split("var out='';out+=").join('var out=');

		try {
			return new Function(c.varname, str);
		} catch (e) {
			if (typeof console !== 'undefined') console.log("Could not create a template function: " + str);
			throw e;
		}
	}