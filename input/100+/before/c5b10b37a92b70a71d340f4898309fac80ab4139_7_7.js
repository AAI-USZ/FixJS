function property(propertyName){
	var n = this.cachedProperties[propertyName];
	if(n === undefined){
		//console.log('initializing property: ' + propertyName);
		//console.log('type schema: ' + JSON.stringify(this.typeSchema));
		var pt = this.typeSchema.properties[propertyName];
		//_.assertDefined(pt);
		if(pt === undefined) _.errout('property ' + this.typeSchema.name + '.' + propertyName + ' not recognized');
		_.assertObject(this.obj);
		var pv = this.obj[pt.code]//getPropertyValue(this.obj, pt.code);
		if(pt.type.type === 'object'){
			var fullSchema = this.getFullSchema();
			if(pv === undefined){
				if(pt.tags.must_already_exist){
					_.errout('cannot create local object due to must_already_exist constraint in schema - must specify property value to a object reference via setProperty');
				}
				
				var objSchema = fullSchema[pt.type.object];
				var types = recursivelyGetLeafTypes(objSchema, fullSchema);
				if(types.length > 1){
					_.errout('need to specify object type - use setPropertyType');
				}else{
					n = new ObjectHandle(fullSchema[types[0]], undefined, -1, [pt.code], this, true);
				}
			}else{
				if(pt.tags && pt.tags.lazy){
					var objSchema = fullSchema._byCode[pv.meta.typeCode];
					n = new ObjectHandle(objSchema, pv, -1, [pt.code], this);
				}else{
					if(_.isInteger(pv) || _.isString(pv)){
						n = this.getObjectApi(pv, this);
					}else{				
						var objSchema = fullSchema._byCode[pv.meta.typeCode];
						n = new ObjectHandle(objSchema, pv, pv.meta.id, [], this);
					}
				}
			}
			n.prepare();
		}else if(pt.type.type === 'view'){
			//_.assertLength(pv, 2);
			_.assertInt(pv);
			//_.assertString(pv[1]);
			n = this.getObjectApi(pv, this);
		}else{
			var c = api.getClassForType(pt, this.typeSchema.isView);
			n = new c(pt, pv, [pt.code], this, this.typeSchema.isView);
		}
		this.cachedProperties[propertyName] = n;
	}
	return n;
}