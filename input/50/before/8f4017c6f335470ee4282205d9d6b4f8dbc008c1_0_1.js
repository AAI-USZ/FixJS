function(name) {
			return _(name_to_model[name] || []).clone();
		}