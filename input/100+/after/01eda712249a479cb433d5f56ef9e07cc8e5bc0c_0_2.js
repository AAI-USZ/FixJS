function (key, data, sync) {
				if (key === null) key = undefined;
				sync = (sync === true);

				switch (true) {
					case (typeof key === "undefined" || String(key).isEmpty()) && this.uri === null:
					case typeof data === "undefined":
					case data instanceof Array:
					case data instanceof Number:
					case data instanceof String:
					case typeof data !== "object":
						throw Error(label.error.invalidArguments);
				}

				var record = typeof key === "undefined" ? undefined : this.get(key),
				    obj    = this.parentNode,
				    method = typeof key === "undefined" ? "post" : "put",
				    args   = {data: typeof record !== "undefined" ? utility.merge(record.data, data) : data, key: key, record: undefined},
				    uri    = this.uri,
				    r      = /true|undefined/,
				    p;

				if (typeof record !== "undefined") args.record = this.records[this.keys[record.key].index];

				this.collections.each(function (i) { if (typeof args.data[i] === "object") delete args.data[i]; });

				if (!sync && this.callback !== null && uri !== null) {
					if (typeof record !== "undefined") uri += "/" + record.key;
					p = uri.allows(method);
				}

				obj.fire("beforeDataSet", {key: key, data: data});
				switch (true) {
					case sync:
					case this.callback !== null:
					case this.uri === null:
						obj.fire("syncDataSet", args);
						break;
					case r.test(p):
						uri[method](function (arg) { args["result"] = arg; obj.fire("syncDataSet", args); }, function () { obj.fire("failedDataSet"); }, data, utility.merge({withCredentials: this.credentials}, this.headers));
						break;
					default:
						obj.fire("failedDataSet", args);
				}
				return this;
			}