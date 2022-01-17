function(tmpl, c, def) {
		c = c || doT.templateSettings;
		var cse = c.append ? startend.append : startend.split, str;

		if (c.use || c.define) {
			var olddef = global.def; global.def = def || {}; // workaround minifiers
			str = resolveDefs(c, tmpl, global.def);
			if (olddef) global.def = olddef; else delete global.def;
		} else str = tmpl;

		str = ("var out='" + ((c.strip) ? str.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g, ''): str)
			.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(c.interpolate, function(m, code) {
				return cse.start + unescape(code) + cse.end;
			})
			.replace(c.encode, function(m, code) {
				return cse.startencode + unescape(code) + cse.end;
			})
			.replace(c.conditionalEnd, "';}out+='")
			.replace(c.conditionalElse, function(m, code) {
				return (code) ? "';}else if(" + unescape(code)  + "){out+='" : "';}else{out+='";
			})
			.replace(c.conditionalStart, function(m, code) {
				return "';if(" + unescape(code)  + "){out+='";
			})
			.replace(c.evaluate, function(m, code) {
				return "';" + unescape(code) + "out+='";
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