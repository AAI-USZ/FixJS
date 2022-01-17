function(models) {
				if (refresh) {
					this.empty();
					Array.each(responseObj, this.addModel.bind(this));
				}
				else {
					this.processModels(responseObj);
				}

				// finaly fire the event to instance
				this.fireEvent('fetch', [models])
			}