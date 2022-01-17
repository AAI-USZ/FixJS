function Validator(validators){
	
	function fn(propex, value, augmentors){
		if(typeof propex == "string")
			propex = Px(propex);
		var isArray = propex.isArray,
			valid = isArray? [] : {},
			errors = isArray? [] : {};

		disseminate(value, { name:"-1", isOptional:false, subproperties:propex }, isArray, valid, errors, augmentors);

		var result = { valid: valid };
		//-1 means the top level object was missing or a type mismatch
		if(errors["-1"])
			result.errors = errors["-1"];
		else if(Object.keys(errors).length)
			result.errors = errors;

		return result;
	}
	fn.constructor = Validator;
	fn.__proto__ = Validator.prototype;
	fn.validators = (function(temp){
		Object.keys(validators || {}).forEach(function(k) {
			var v = validators[k];
			if(v.constructor == Validator){
				temp[k] = { parse: v };
			}
			else temp[k] = clone(v);
		});
		return temp;
	})({});

	return fn;

	//----------------------------------------------------


	function disseminate(value, property, isArray, valid, errors, augmentors){
		if(!property.isOptional && (value == undefined || typeMismatch(isArray, value))) {
			errors["-1"] = Validator.errors.required("-1", value);
			return;
		}
		var subs = property.subproperties,
			marker = subs.marker;

		if(isArray) examineArray(value, subs, valid, errors);
		else examineObject(value, subs, valid, errors);

		if(marker && augmentors){
			var aug = augmentors[marker];
			aug && aug("-1", result);
		}
	}
	function examineObject(obj, propex, valid, errors){
		var pxi = propex.items;
		Object.keys(pxi).forEach(function(key) {
			examineItem(key, obj[key],  pxi[key], errors, valid, validators[key]);
		});
	}
	function examineArray(array, propex, valid, errors){
		var defaultProperty = propex.items["-1"],
			defaultValidator = validators["-1"],
			pxItems = propex.items,
			validator,
			property,
			i;

		for(i=0;i<array.length;i++){
			if(i > propex.max){
				break;
			}
			property = pxItems[i] || defaultProperty;
			if (property == null)
				throw new Error("No Property specifed for item[" + i + "] and no default is specified.");

			validator = validators[key] || defaultValidator;
			examineItem(i, array[i],  property, errors, valid, validator);
		}
	}
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
}