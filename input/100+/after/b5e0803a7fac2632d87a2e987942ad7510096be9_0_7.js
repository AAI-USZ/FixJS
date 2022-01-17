function (arg) {
				var data = utility.clone(arg),
				    record;

				switch (true) {
					case typeof data.record === "undefined":
						var index = this.total;
						this.total++;
						if (typeof data.key === "undefined") {
							if (typeof data.result === "undefined") {
								this.fire("failedDataSet");
								throw Error(label.error.expectedObject);
							}
							data.key = this.key === null ? array.cast(data.result).first() : data.result[this.key];
							data.key = data.key.toString();
						}
						if (typeof data.data[data.key] !== "undefined") data.key = data.data[data.key];
						this.keys[data.key] = {};
						this.keys[data.key].index = index;
						this.records[index] = {};
						record      = this.records[index];
						record.data = data.data;
						record.key  = data.key;
						if (this.key !== null && this.records[index].data.hasOwnProperty(this.key)) delete this.records[index].data[this.key];
						break;
					default:
						data.record.data = utility.clone(data.data);
						record = data.record;
				}
				this.views = {};
				this.parentNode.fire("afterDataSet", record);
			}