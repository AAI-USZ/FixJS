function () {
							this.un("failedDataBatch", guid);
							if (reindex) self.reindex();
							this.fire("afterDataSync", self.get());
						}