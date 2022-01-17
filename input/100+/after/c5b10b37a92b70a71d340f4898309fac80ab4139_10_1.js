function PrimitiveListHandle(typeSchema, obj, part, parent, isReadonly){
	
	this.part = part;
	this.obj = [].concat(obj || []);
	this.parent = parent;
	this.schema = typeSchema;

	this.assertMemberType = u.getPrimitiveCollectionAssertion('list', typeSchema)

	this.readonly = isReadonly;
	if(isReadonly){
		this.remove = readonlyError;
		this.add = readonlyError;
		this.shift = readonlyError;
	}
	this.latestVersionId = -1
	console.log('setting up primitive list: ' + JSON.stringify(obj))
	
	this.addOp = u.getAddOperator(typeSchema)
	this.removeOp = u.getRemoveOperator(typeSchema)
}