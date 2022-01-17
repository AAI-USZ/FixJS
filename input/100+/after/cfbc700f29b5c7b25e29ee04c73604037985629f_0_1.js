function(val,property) {
					if (_.isArray(val) && val.length === 1) {val = val[0];} //If val is a single vlaue array, take the value out of the array.
					if (_(val).isFunction()) { val = val(m); }
					if (_.isUndefined(val)) { val = '<i>undefined</i>'; }
					if (_(val).isNumber()) { val = val.toString(); }
					if (_(val).isObject() && val instanceof Backbone.Model) { val = val.attributes._id || val.attibutes._oid; }
					//if (_(val).isObject() && !_(val).isElement()) { return "object"; } // return if val is an object, but not if it is an element object
					if (_(val).isObject() && !_(val).isElement()) { val = "non-element object"; } // return if val is an object, but not if it is an element object
					if (_(val).isString() || _(val).isElement()) { // jQuery can handle html strings and element objects.
						$("<td></td>").append(val).appendTo(this_.el);
					} else {
						console.error("Could not convert ", val);
						$("<td></td>").append("error").appendTo(this_.el);
					}
				}