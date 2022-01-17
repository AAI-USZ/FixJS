function (record, end) {
				var records = this.records,
				    obj     = this.parentNode,
				    r;

				switch (true) {
					case typeof record === "undefined":
					case String(record).length === 0:
						r = records;
						break;
					case typeof record === "string" && typeof this.keys[record] !== "undefined":
						r = records[this.keys[record].index];
						break;
					case typeof record === "number" && typeof end === "undefined":
						r = records[parseInt(record)];
						break;
					case typeof record === "number" && typeof end === "number":
						r = records.range(parseInt(record), parseInt(end));
						break;
					default:
						r = undefined;
				}

				return utility.clone(r);
			}