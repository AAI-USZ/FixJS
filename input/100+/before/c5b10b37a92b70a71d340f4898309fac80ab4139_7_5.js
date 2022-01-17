function(propertyName, newType, external){
	var pt = this.typeSchema.properties[propertyName];
	_.assertDefined(pt);
	_.assert(pt.type.type === 'object');
	
	_.assert(arguments.length >= 2)
	_.assert(arguments.length <= 3)
	
	if(_.isBoolean(newType) && arguments.length === 2){
		external = newType;
		newType = undefined;
	}

	var fullSchema = this.getFullSchema();
	var objectSchema = fullSchema[pt.type.object];

	var types = recursivelyGetLeafTypes(objectSchema, fullSchema);
	if(newType === undefined){
		_.assertLength(types, 1);
		newType = types[0];
	}else{
		_.assertIn(types, newType);
	}
	objectSchema = fullSchema[newType];

	var res;	
	var temporary = u.makeTemporaryId();
	var newObj;
	if(external){
		console.log('created new external object')
		newObj = this.createNewExternalObject(objectSchema.code, temporary);
		res = this.getObjectApi(temporary, this)	
		this.obj[pt.code] = temporary;
	}else{
		newObj = this.obj[pt.code] = {meta: {id: temporary, typeCode: objectSchema.code}};
	}
	
	if(this.typeSchema.isView){
		_.assert(external)

		this.getSh().persistEdit(
			-1, 
			[], 
			'make',
			{obj: {type: objectSchema.code, object: newObj}, temporary: temporary},
			this.getEditingId());

		//a = this.getObjectApi(id, local);
		//local.addToApiCache(temporary, a);
		
	}else{
		this.getSh().persistEdit(
			this.getObjectId(), 
			this.getPath().concat([pt.code]), 
			'setToNew',
			{newType: objectSchema.code, temporary: temporary, external: !!external},
			this.getEditingId());
	}	

	delete this.cachedProperties[propertyName]
	this[propertyName] = this.property(propertyName);

	return this[propertyName];
}