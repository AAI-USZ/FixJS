function(options) {
			if (options.id === null) {
				options.id = $.tk.randomId();
			}
			var dialogOptions = {
					disabled: true,
					autoOpen: false
			};
			$.extend(dialogOptions, options.options);
			return dialog = $("<div id=" + options.id + "><!-- --></div>")
				.appendTo('body')
				.dialog(dialogOptions);
		}