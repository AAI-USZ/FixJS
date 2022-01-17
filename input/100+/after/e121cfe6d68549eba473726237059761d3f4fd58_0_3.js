function(data) {

			var record;

			if (data) {

				var id = $.isFunction(this.options.valueField) ? this.options

						.valueField(data) : data[this.options.valueField];

				var value = $.isFunction(this.options.displayField)

						? this.options.displayField(data)

						: data[this.options.displayField];

				var list = $.isFunction(this.options.listView) ? this.options

						.listView(data) : undefined;

				record = {

					id : id,

					label : value,

					value : value,

					listView : list,

					obj : data

				};

			}

			return record;

		}