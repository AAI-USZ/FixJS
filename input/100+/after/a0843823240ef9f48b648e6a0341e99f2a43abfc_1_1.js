function examineArray(array, propex, valid, errors){
		var defaultProperty = propex.items["-1"],
			defaultValidator = config["-1"],
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

			validator = config[key] || defaultValidator;
			examineItem(i, array[i],  property, errors, valid, validator);
		}
	}