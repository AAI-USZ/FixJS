function addLinkAnnotations(value, tmpl, props, key, path) {
		var elemAnnotation,
			tag = tmpl.tag,
			linkInfo = "i",
			closeToken = "/i";

		if (!tag) {
			tag = rFirstElem.exec(tmpl.markup);
			tag = tmpl.tag = (tag || (tag = rFirstElem.exec(value))) && tag[1];
		}

		if (key) {
			linkInfo = ":" + key;
			closeToken = "/t";
		}
		if (/^(option|optgroup|li|tr|td)$/.test(tag)) {
			elemAnnotation = "<" + tag + ' jsvtmpl="';
			return elemAnnotation + linkInfo + '"/>' + $.trim(value) + elemAnnotation + closeToken + '"/>';
		}
		return "<!--jsv" + linkInfo + "-->" + value + "<!--jsv" + closeToken + "-->";
	}