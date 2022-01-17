function() {
						if (!this.container.is('.multiselect-disabled') && allowState(currentState)) {
							set_state(currentState, this, options);
							changed = true;
						}
					}