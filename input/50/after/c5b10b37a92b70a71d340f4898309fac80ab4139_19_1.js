function getObjectApi(idOrViewKey, sourceParent){
	_.assertDefined(idOrViewKey)
	return this.parent.getObjectApi(idOrViewKey, sourceParent);
}