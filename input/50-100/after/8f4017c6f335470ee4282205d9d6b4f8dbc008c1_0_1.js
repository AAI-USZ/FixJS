function(model,name) {
			name = name.toLowerCase() // Only deal with lowercase, so matching is not case-sensitive.
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
		}