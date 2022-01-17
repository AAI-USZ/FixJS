function(val,property) {
					if (_.isUndefined(val)) { val = '<i>undefined</i>'; console.log(val); }
					if (_(val).isFunction()) { val = val(m); }
					if (_(val).isNumber()) { val = val.toString(); }
					if (_(val).isObject() && val instanceof Backbone.Model) { val = val.attributes._id || val.attibutes._oid; }
					if (_(val).isObject() && !_(val).isElement()) { return "object"; }
					if (val.length === 1) {val = val[0];}
					if (_(val).isString() || _(val).isElement()) {
						$("<td></td>").append(val).appendTo(this_.el);
					} else {
						console.error("Could not convert ", val);
						$("<td></td>").append("error").appendTo(this_.el);
					}
				}