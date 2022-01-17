function(r){
		
		var rel = {
			name: r.tokens[0],
			type: parseType(r.tokens[1]),
			code: parseInt(r.tokens[2]),
			tags: {},
			properties: {},
			propertiesByCode: {}
		};
		
		if(takenCodes[rel.code] !== undefined){
			_.errout('object of type ' + obj.name + ' property code used more than once: ' + rel.name + ' ' + rel.code);
		}
		takenCodes[rel.code] = true;
		
		if(reservedTypeNames.indexOf(rel.name.toLowerCase()) !== -1){
			_.errout('object property has reserved name: ' + rel.name);
		}
		
		if(r.tokens.length > 3){
			_.each(r.tokens.slice(3), function(t){
				rel.tags[t] = true;
			});
		}
		
		//'children' of rels are not allowed in the keratin format
		if(r.children.length > 0){
			_.errout('The keratin format only permits one level of indentation (properties may not have sub-properties.)');
		}
		
		obj.properties[r.tokens[0]] = rel;
		obj.propertiesByCode[rel.code] = rel;
	}