function (arg, ignore, key) {
				var ignored = false,
				    self    = this,
				    record;

				if (typeof arg === "undefined" || (typeof arg !== "number" && typeof arg !== "string")) throw Error(label.error.invalidArguments);

				record = this.get(arg);
				record = this.records[this.keys[record.key].index];
				key    = key || this.key;

				if (typeof ignore === "string") {
					ignored = true;
					ignore  = ignore.explode();
				}

				self.collections = [];

				utility.iterate(record.data, function (v, k) {
					if (ignored && ignore.index(k) > -1) return;
					if (v.indexOf("//") >= 0) {
						if (!self.collections.contains(k)) self.collections.push(k);
						record.data[k] = data.register({id: record.key + "-" + k});
						record.data[k].data.headers = utility.merge(record.data[k].data.headers, self.headers);
						record.data[k].data.key     = key;
						record.data[k].data.source  = self.source;
						record.data[k].data.uri     = v;
					}
				});
				return this.get(arg);
			}