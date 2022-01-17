function () {
							this.un("failedDataBatch", guid);
							if (reindex) self.reindex();
							self.loaded = true;
							this.fire("afterDataSync", self.get());
						}