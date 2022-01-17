function(tagInstance, args) {
				var i = 0,
					l = args.length;

				while (l && !args[i++]) {
					// Only render content if args.length === 0 (i.e. this is an else with no condition) or if a condition argument is truey
					if (i === l) {
						return "";
					}
				}
				view.onElse = undefined; // If condition satisfied, so won't run 'else'.
				tagInstance.path = "";
				return tagInstance.renderContent(view);
				// Test is satisfied, so render content, while remaining in current data context
				// By passing the view, we inherit data context from the parent view, and the content is treated as a layout template
				// (so if the data is an array, it will not iterate over the data
			}