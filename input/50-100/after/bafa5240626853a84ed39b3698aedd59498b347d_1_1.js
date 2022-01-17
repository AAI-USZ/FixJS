function (view) {
					var json = JSON.parse(view);
					
					if (json.rows.length == this.getNbItems()) {
						json.rows.some(function (value, idx) {
							if (value.id == id) {
								this.set(idx, value);
							}
						}, this);
					} else {
						this.actions.evenDocsInStore.call(this, json.rows, id);
					}

				}