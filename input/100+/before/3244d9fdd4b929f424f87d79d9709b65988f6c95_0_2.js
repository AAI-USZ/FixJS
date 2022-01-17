function(v){
		
		var code = v.tokens[1];
		var name = v.tokens[0]

		if(name.indexOf('(') !== -1) return//TODO remove this coupling between minnow/shared/schema.js and keratin
		
		if(takenCodes[code]){
			_.errout('object ' + name + ' is using a code that is already taken: ' + code);
		}
		takenCodes[code] = true;
		var obj = {
			name: name,
			code: parseInt(code),
			superTypes: {},
			subTypes: {},
			properties: {},
			propertiesByCode: {}
		};

		if(reservedTypeNames.indexOf(obj.name) !== -1) _.errout('invalid name, reserved: ' + obj.name);
		
		if(v.tokens.length > 2){
			_.each(v.tokens.slice(2), function(t){
				obj.superTypes[t] = true;
			});
		}
		
		parseProperties(obj, v.children, reservedTypeNames);
		
		result[obj.name] = obj;
		result._byCode[obj.code] = obj;
	}