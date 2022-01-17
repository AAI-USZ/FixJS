function examineItem(key, item,  property, errors, valid, actions){
		if(item == undefined || (property.items && typeMismatch(property.items.isArray, item))) {
			if(!property.isOptional)
				errors[key] = ((actions && actions.missing) || Validator.errors.required)(key, item);
			return;
		}

		if(!actions) {
			valid[key] = item;
			return;
		}
		if(actions.parse) {
			item = actions.parse(property.subproperties, item);
			if(item.errors)
				errors[key] = item.errors;

			item = item.valid;
		}

		var errorMessage;
		if(actions.test && (errorMessage = actions.test(item))){
			errors[key] = errorMessage;
		}
		else{
			if(actions.set) actions.set.call(property, valid, item);
			else valid[key] = item;
		}
	}