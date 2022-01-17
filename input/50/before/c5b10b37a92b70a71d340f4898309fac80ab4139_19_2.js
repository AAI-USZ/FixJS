function createNewExternalObject(typeCode, temporaryId){
	_.assertDefined(this.parent);
	return this.parent.createNewExternalObject(typeCode, temporaryId);
}