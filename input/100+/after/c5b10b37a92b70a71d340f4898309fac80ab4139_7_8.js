function toJson(already){

	if(this.obj === undefined) return undefined;
	
	var obj = {};

	var local = this;
	
	already = already||{}
	if(already[this.objectId]){
		return 'CIRCULAR REFERENCE'
	}
	already[this.objectId] = true
	Object.keys(this.typeSchema.properties).forEach(function propertyToJson(name){
		var p = local.typeSchema.properties[name];
		if(local.hasProperty(p.name)){
			obj[p.name] = local.property(p.name).toJson(already)
		}
	})
	obj.id = this.objectId

	obj.type = this.typeSchema.name;
	return obj;
}