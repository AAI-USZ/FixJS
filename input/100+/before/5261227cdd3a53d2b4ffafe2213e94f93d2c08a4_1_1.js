function(inObjects) {
		var o$ = this.groupFilter(inObjects);
		var html = '';
		//
		var objs = this.getByType(o$, "kind");
		if (objs.length) {
			html += "<h3>Kinds</h3>";
			for (var i=0, o; o=objs[i]; i++) {
				//w("<i>name:</i> ");
				html += "<kind>" + o.name + "</kind><br/>";
				html += this.presentComment(o.comment);
				//html += "<blockquote>" + this.presentKind(o) + "</blockquote>";
				//html += this.presentKind(o);
			}
		}
		//
		var objs = this.getByType(o$, "function");
		html += "<h3>Functions</h3>";
		for (var i=0, o; o=objs[i]; i++) {
			html += this.presentComment(o.comment);
			if (o.group) {
				html += "<" + o.group + ">" + o.group + "</" + o.group  + ">";
			}
			html += "<i>name:</i> <label>" + o.name + "(<arguments>" + o.value[0].arguments.join(", ") + "</arguments>)</label><br/>";
		}
		html += "<h3>Variables</h3>";
		var objs = this.getByType(o$, "global");
		for (var i=0, o; o=objs[i]; i++) {
			html += this.presentComment(o.comment);
			if (o.group) {
				html += "<" + o.group + ">" + o.group + "</" + o.group  + ">";
			}
			//html += "<i>name:</i> <label>" + o.name + "</label><br/>";
			html += "<label>" + o.name + "</label> = ";
			html += this.presentExpression(o.value[0]);
			html += "<br/>";
		}
		//
		return html;
	}