function(view) {
						if (view.settings[keyFilter]===valueFilter) {
							view.destroy.call(view);
							i++;
						}
					}