function(ctx, tmpl) {
		if (typeof ctx === 'undefined') {
			throw new Error("Missing value for @if");
		}
		
		if (ctx.value) {
			return tmpl.render(this);
		} else {
			// Return empty fragment
			return this.createDocumentFragment();
		}
	}