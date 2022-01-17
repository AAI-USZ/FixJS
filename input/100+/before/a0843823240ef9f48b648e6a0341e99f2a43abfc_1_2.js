function examineItem(key, item,  property, errors, valid, validator){
		if(item == undefined || (property.items && typeMismatch(property.items.isArray, item))) {
			if(!property.isOptional)
				errors[key] = ((validator && validator.missing) || Validator.errors.required)(key, item);
			return;
		}

		if(!validator) {
			valid[key] = item;
			return;
		}
		if(validator.parse) {
			item = validator.parse(property.subproperties, item);
			if(item.errors)
				errors[key] = item.errors;

			item = item.valid;
		}

		var errorMessage;
		if(validator.test && (errorMessage = validator.test(item))){
			errors[key] = errorMessage;
		}
		else{
			if(validator.set) validator.set.call(property, valid, item);
			else valid[key] = item;
		}
	}