function(view) {
						if (keyFilter(view)) {
							view.destroy.call(view);
							i++;
						}
					}