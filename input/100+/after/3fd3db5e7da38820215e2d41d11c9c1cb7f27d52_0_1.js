function(event, index) {
				if (event.which == 1) {
					event.stopPropagation();

					var range = null;
					if (event.shiftKey) {
						range = items.slice(Math.min(currentIndex, index), Math.max(currentIndex, index) + 1);
					} else {
						range = [items[index]];
					}

					currentState	= !items[index].container.hasClass('multiselect-selected');
					currentIndex	= index;

					var changed = false;
					$.each(range, function() {
						if (!this.container.is('.multiselect-disabled') && allowState(currentState)) {
							set_state(currentState, this, options);
							changed = true;
						}
					});

					if (changed) {
						$(element).trigger('change');
					}
				}
			}