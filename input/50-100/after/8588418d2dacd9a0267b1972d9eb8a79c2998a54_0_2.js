function getTemplate(tmpl) {
		// Get nested templates from path
		if ("" + tmpl === tmpl) {
			var tokens = tmpl.split("[");
			tmpl = $templates[tokens.shift()];
			while (tmpl && tokens.length) {
				tmpl = tmpl.tmpls[tokens.shift().slice(0, -1)];
			}
		}
		return tmpl;
	}