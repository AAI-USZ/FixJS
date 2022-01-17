function (v, k) {
					if (ignored && ignore.index(k) > -1) return;
					if (v.indexOf("//") >= 0) {
						self.collections.push(k);
						record.data[k] = data.register({id: record.key + "-" + k});
						record.data[k].data.headers = utility.merge(record.data[k].data.headers, self.headers);
						record.data[k].data.key     = key;
						record.data[k].data.source  = self.source;
						record.data[k].data.uri     = v;
					}
				}