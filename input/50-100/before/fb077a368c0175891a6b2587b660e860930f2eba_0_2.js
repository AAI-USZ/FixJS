function(tagObject, args) {
				var i = 0,
					l = args.length;

				while (l && !args[i++]) {
					// Only render content if args.length === 0 (i.e. this is an else) or if a condition argument is truey
					if (i === l) {
						return "";
					}
				}
				view.onElse = undefined; // If condition satisfied, so won't run 'else'.
				tagObject.path = "";
				return tagObject.renderContent(view);
				// Test is satisfied, so render content, while remaining in current data context
				// By passing the view, we inherit data context from the parent view, and the content is treated as a layout template
				// (so if the data is an array, it will not iterate over the data
			}