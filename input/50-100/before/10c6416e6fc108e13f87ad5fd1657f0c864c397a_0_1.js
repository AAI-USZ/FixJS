function(val, key) {
					if (key == '_id') { return; }
					if (_.isUndefined(this_.get(key))) {
						this_._add_property_models(model, val);
					} else {
						this_.trigger("change", p); // What is the significance of this?
					}
				}