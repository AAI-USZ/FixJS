function() {
				var items = this.bottomPanel.items.items;
				
				var field = undefined
				if(this.operator_combo.validate())
					field = this.operator_combo.getValue();
				if(!field || field == '')
					return undefined

				var value = this.string_value.getValue();
				var output = {};

				if (this.contain_other_cfilter) {
					//get into cfilter
					var values = [];
					//get all cfilter values
					for (var i in items) {
						var cfilter = items[i];
						values.push(cfilter.getValue());
					}
				}else {
					//just simple value (no inner cfilter)
					var values = {};
					var sub_operator = this.sub_operator_combo.getValue();
					var sub_operator_type = this.get_type_from_operator(sub_operator, this.sub_operator_store);

					//choose between array or value
					if (sub_operator_type == 'value') {
						if (sub_operator != '$eq')
							values[sub_operator] = this.string_value.getValue();
						else
							var values = this.string_value.getValue();
					}else if (sub_operator_type == 'array') {
						values[sub_operator] = this.array_field.getValue();
					}
				}

				output[field] = values;
				return output;
			}