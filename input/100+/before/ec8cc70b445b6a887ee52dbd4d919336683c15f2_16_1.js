function( options, success, error ) {
			var type = $view.types["." + options.type],
				id = toId(options.rootSrc);

			options.text = "steal('" + (type.plugin || "jquery/view/" + options.type) + "').then(function($){" + "Can.View.preload('" + id + "'," + options.text + ");\n})";
			success();
		}