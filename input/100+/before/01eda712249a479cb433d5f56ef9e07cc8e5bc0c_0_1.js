function (record, reindex, sync) {
				if (typeof record === "undefined" || (typeof record !== "number" && typeof record !== "string")) throw Error(label.error.invalidArguments);

				reindex  = (reindex !== false);
				sync     = (sync === true);
				var obj  = this.parentNode,
				    r    = /true|undefined/,
				    key, args, uri, p;

				switch (typeof record) {
					case "string":
						key    = record;
						record = this.keys[key];
						if (typeof key === "undefined") throw Error(label.error.invalidArguments);
						record = record.index;
						break;
					default:
						key = this.records[record];
						if (typeof key === "undefined") throw Error(label.error.invalidArguments);
						key = key.key;
				}

				args   = {key: key, record: record, reindex: reindex};

				if (this.uri !== null) {
					uri = this.uri + "/" + key;
					p   = uri.allows("delete");
				}

				obj.fire("beforeDataDelete", args);
				switch (true) {
					case sync:
					case this.callback !== null:
					case this.uri === null:
						obj.fire("syncDataDelete", args);
						break;
					case r.test(p):
						uri.del(function () { obj.fire("syncDataDelete", args); }, function () { obj.fire("failedDataDelete", args); }, utility.merge({withCredentials: this.credentials}, this.headers));
						break;
					default:
						obj.fire("failedDataDelete", args);
				}
				return this;
			}