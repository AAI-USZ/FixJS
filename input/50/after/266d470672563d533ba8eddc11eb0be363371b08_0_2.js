function(ctx, tmpl) {
		if (ctx.value) {
			return tmpl.render(this);
		} else {
			// Return empty fragment
			return this.createDocumentFragment();
		}
	}