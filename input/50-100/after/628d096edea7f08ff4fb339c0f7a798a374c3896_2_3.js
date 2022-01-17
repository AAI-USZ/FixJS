function(context) {
					var component = context.component;

					// Ensure that create thru ready happen in order, and that
					// destroy does not happen
					assert.equals(component.lifecycle, steps.slice(0, steps.length-3));

					// Ensure that destroy happens and is always last
					return context.destroy().then(
						function() {
							assert.equals(component.lifecycle, steps);
						},
						fail
					);
				}