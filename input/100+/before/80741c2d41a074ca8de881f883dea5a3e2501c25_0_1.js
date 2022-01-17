function (data, key) {
					var guid = utility.genId(),
					    rec  = utility.clone(data);

					if (self.key !== null && typeof rec[self.key] !== "undefined") {
						key = rec[self.key];
						delete rec[self.key];
					}

					obj.once("afterDataSet", function () {
						this.un("failedDataSet", guid);
						if (++r && r === nth) completed();
					}, guid).once("failedDataSet", function () { this.un("afterDataSet", guid); }, guid);

					self.set(key, rec, sync);
				}