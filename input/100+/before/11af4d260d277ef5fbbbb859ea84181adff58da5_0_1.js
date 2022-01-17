function(path, spec, row) {
					for(var prop in spec) {
						if(acx.isObject(spec[prop])) {
							arguments.callee(path.concat(prop), spec[prop], row);
						} else if(acx.isArray(spec[prop])) {
							if(spec[prop].length) {
								arguments.callee(path.concat(prop), spec[prop][0], row)
							}
						} else{
							var dpath = path.concat(prop).join(".");
							if(metadata.paths[dpath]) {
								var field_name = metadata.paths[dpath].field_name;
								if(! columns.contains(field_name)) {
									columns.push(field_name);
								}
								row[field_name] = (spec[prop] || "null").toString();
							} else {
								// TODO: field not in metadata index
							}
						}
					}
					return row;
				})([ hit._index, hit._type ], hit._source, {}