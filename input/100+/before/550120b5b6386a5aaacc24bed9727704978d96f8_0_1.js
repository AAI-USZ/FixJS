function(state) {
			// currently metadata expects all like named fields to have the same type, even when from different types and indices
			var aliases = this.aliases = {};
			var indices = this.indices = {};
			var types = this.types = {};
			var fields = this.fields = {};
			var paths = this.paths = {};

			function createField(mapping, index, type, path, name) {
				var dpath = [index, type ].concat(path).join(".");
				var field_name = mapping.index_name || name;
				var field = paths[dpath] = fields[field_name] = fields[field_name] || acx.extend({
					field_name: field_name, core_type: coretype_map[mapping.type], dpaths: []
				}, default_property_map[coretype_map[mapping.type]], mapping);
				field.dpaths.push(dpath);
				return field;
			}
			function getFields(properties, type, index, listeners) {
				(function(prop, path) {
					for(var n in prop) {
						if("properties" in prop[n]) {
							arguments.callee(prop[n].properties, path.concat(n));
						} else {
							var field = createField(prop[n], index, type, path.concat(n), n);
							listeners.forEach(function(obj) { obj[field.field_name] = field; });
						}
					}
				})(properties, []);
			}
			for(var index in state.metadata.indices) {
				indices[index] = { types: [], fields: {}, paths: {} };
				indices[index].aliases = state.metadata.indices[index].aliases;
				indices[index].aliases.forEach(function(alias) {
					( aliases[alias] || (aliases[alias] = [ ])).push(index);
				});
				var mapping = state.metadata.indices[index].mappings;
				for(var type in mapping) {
					indices[index].types.push(type);
					types[type] = { indices: [ index ], fields: {} };
					getFields(mapping[type].properties, type, index, [ fields, types[type].fields, indices[index].fields ]);
				}
			}
			this.aliasesList = Object.keys(aliases);
			this.indicesList = Object.keys(indices);
			this.typesList = Object.keys(types);
			this.fieldsList = Object.keys(fields);
		}