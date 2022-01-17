function createNewExternalObject(typeCode, temporaryId, obj, forget){
	_.assertLength(arguments, 4)
	_.assertDefined(this.parent);
	return this.parent.createNewExternalObject(typeCode, temporaryId, obj, forget);
}