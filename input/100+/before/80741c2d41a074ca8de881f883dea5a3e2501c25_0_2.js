function (type, data, sync) {
				type = type.toString().toLowerCase();
				sync = (sync === true);

				if (!/^(set|del)$/.test(type) || typeof data !== "object") throw Error(label.error.invalidArguments);

				var obj  = this.parentNode,
				    self = this,
				    r    = 0,
				    nth  = 0,
				    f    = false,
				    guid = utility.genId(true),
				    completed, key, set;

				completed = function () {
					if (type === "del") this.reindex();
					obj.fire("afterDataBatch");
				};

				set  = function (data, key) {
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
				};

				obj.fire("beforeDataBatch", data);

				switch (type) {
					case "set":
						if (sync) this.clear(true);
						obj.once("failedDataSet", function () {
							if (!f) {
								f = true;
								obj.fire("failedDataBatch");
							}
						});
						break;
					case "del":
						obj.on("afterDataDelete", function () {
							if (r++ && r === nth) {
								obj.un("afterDataDelete", guid);
								completed();
							}
						}, guid).once("failedDataDelete", function () {
							obj.un("afterDataDelete", guid);
							if (!f) {
								f = true;
								obj.fire("failedDataBatch");
							}
						});
						break;
				}

				if (data instanceof Array) {
					nth = data.length;
					switch (nth) {
						case 0:
							completed();
							break;
						default:
							data.each(function (i, idx) {
								idx = idx.toString();
								if (type === "set") switch (true) {
									case typeof i === "object":
										set(i, idx);
										break;
									case i.indexOf("//") === -1:
										i = self.uri + i;
									default:
										i.get(function (arg) { set(self.source === null ? arg : arg[self.source], idx); }, null, utility.merge({withCredentials: self.credentials}, self.headers));
										break;
								}
								else self.del(i, false, sync);
							});
					}
				}
				else {
					nth = array.cast(data, true).length;
					utility.iterate(data, function (v, k) {
						if (type === "set") {
							if (self.key !== null && typeof v[self.key] !== "undefined") {
								key = v[self.key];
								delete v[self.key];
							}
							else key = k.toString();
							self.set(key, v, sync);
						}
						else self.del(v, false, sync);
					});
				}

				return this;
			}