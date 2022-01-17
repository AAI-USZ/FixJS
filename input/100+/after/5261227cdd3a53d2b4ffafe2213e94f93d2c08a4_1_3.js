function(inProperty, inSource) {
		var html = '';
		// group
		var o = inProperty;
		html += '<a name="' + o.name + '"></a>';
		if (o.group) {
			html += "<" + o.group + ">" + o.group + "</" + o.group  + ">";
		}
		// name (and possible ancestor)
		var n = o.name;
		if (o.object && inSource && inSource != o.object) {
			n = '<prototype>' + o.object.name + '::</prototype>' + n;
		}
		html += "<label>" + n + "</label>: ";
		// right-hand side
		if (o.value && o.value[0] && o.value[0].token == "function") {
			// function signature 
			html += "function(<arguments>" + o.value[0]['arguments'].join(", ") + "</arguments>)<br/>";
		} else {
			// value
			html += this.presentValue(o);
		}
		// inline docs
		html += this.presentComment(o.comment);
		// separator
		html += "<hr/>";
		return html;
	}