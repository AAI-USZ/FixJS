function (arg) {
					try {
						if (typeof arg !== "object") throw Error(label.error.expectedObject);

						var data, found = false, guid = utility.genId(true);

						if (self.source !== null && typeof arg[self.source] !== "undefined") arg = arg[self.source];

						if (arg instanceof Array) data = arg.clone();
						else utility.iterate(arg, function (i) {
							if (!found && i instanceof Array) {
								found = true;
								data  = i.clone();
							}
						});

						obj.once("afterDataBatch", function () {
							this.un("failedDataBatch", guid);
							if (reindex) self.reindex();
							this.fire("afterDataSync", self.get());
						}, guid);

						obj.once("failedDataBatch", function () { this.fire("failedDataSync"); }, guid);

						self.batch("set", data, true);
					}
					catch (e) {
						error(e, arguments, this);
						obj.fire("failedDataSync", arg);
					}
				}