function getHelper(helper) {
		// Helper method called as view._hlp() from compiled template, for helper functions or template parameters ~foo
		var view = this,
			tmplHelpers = view.tmpl.helpers || {};

		helper = (
			view.ctx[helper] !== undefined
				? view.ctx
				: tmplHelpers[helper] !== undefined
					? tmplHelpers
					: $viewsHelpers[helper] !== undefined
						? $viewsHelpers
						: {}
		)[helper];
		return typeof helper !== "function" ? helper : function() {
			return helper.apply(view, arguments);
		};
	}