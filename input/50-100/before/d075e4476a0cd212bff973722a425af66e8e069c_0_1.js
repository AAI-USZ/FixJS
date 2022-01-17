function(models) {
				if (refresh) {
					this.empty();
					Array.each(models, this.addModel.bind(this));
				}
				else {
					this.processModels(responseObj);
				}

				// finaly fire the event to instance
				this.fireEvent('fetch', [models])
			}