function() {
		var properties_to_check = [
			"http://www.w3.org/2000/01/rdf-schema#label",
			"http://xmlns.com/foaf/0.1/name",
			"name",
			"summary",                        
		];
		var name_to_model = {};
		var model_to_names = {};
		var add_name = function(model,name) {
			// add the {name} -> model mapping
			var names = get_names_for(model);
			if (names.indexOf(name) <= 0) {
				names.push(name);
			}
			model_to_names[model.id] = names;
			// add model -> name mapping            
			var models_with_name = resolve(name);
			if (models_with_name.indexOf(model.id) <= 0) {
				models_with_name.push(model);
			}
			name_to_model[name] = models_with_name;
			return model;
		};
		var resolve = function(name) {
			return _(name_to_model[name] || []).clone();
		};
		var get_names_for=function(model) {
			return _(model_to_names[model.id] || []).clone();
		};       
		var register_model = function(m) {
			// looks at all label properties and adds them
			properties_to_check.map(function(p) {
				if (m.get(p)) {
					m.get(p).map(function(pv) {
						if (_(pv).isString() && pv.trim().length) {
							add_name(m,pv.trim());
						}                        
					});
				}
			});            
		};
		var add_label_property=function(prop_name) {
			properties_to_check.push(uri);
		};		
		return {
			add_name:add_name,
			resolve:resolve,
			get_names_for:get_names_for,
			register_model:register_model,
			n2m:name_to_model,
			m2n:model_to_names            
		}
    }