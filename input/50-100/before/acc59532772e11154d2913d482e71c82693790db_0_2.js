function(options) {
			if (options.id === null) {
				options.id = $.tk.randomId();
			}
			return dialog = $("<div id=" + options.id + "><!-- --></div>")
				.appendTo('body')
				.dialog({
					disabled: true,
					autoOpen: false
			});
		}