function(context) {

		var e = davinci.Workbench.getOpenEditor(), 

			ctx;



		if (e && e.getContext) {

			ctx = e.getContext();

		}

		if (ctx && ctx.frame) {

			// Review editor

			ctx.frame.contentWindow.focus();

		} else if (ctx && ctx._frameNode) {

			// Page designer

			ctx._frameNode.contentWindow.focus();

		}

	}