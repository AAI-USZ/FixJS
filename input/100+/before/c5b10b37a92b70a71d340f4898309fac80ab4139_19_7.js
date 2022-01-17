function(obj, part, sourceParent){
	_.assertLength(arguments, 3);
	_.assertArray(part);
	var typeCode = obj.meta.typeCode
	_.assertInt(typeCode)
	var t = this.schema._byCode[typeCode];
	_.assertDefined(t)
	//if(t.isView) t = t.schema;
	return new ObjectHandle(t, obj || {}, obj.meta.id, part, sourceParent);
}