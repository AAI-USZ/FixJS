function() {
						if (!this.container.is('.multiselect-disabled') && this.container.is('.multiselect-selected')) {
							set_state(false, this, options);
						}
					}