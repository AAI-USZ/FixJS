function(el) {

		el.runtimeStyle.cssText = '';

		this.vmlFill(el);

		this.vmlOffsets(el);

		this.vmlOpacity(el);

		if (el.isImg) {

			this.copyImageBorders(el);

		}

	}