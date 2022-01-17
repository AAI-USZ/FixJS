function PrimitiveListHandle(typeSchema, obj, part, parent, isReadonly){
	
	this.part = part;
	this.obj = obj || [];
	this.parent = parent;
	this.schema = typeSchema;

	this.assertMemberType = u.getPrimitiveCollectionAssertion('list', typeSchema)

	this.readonly = isReadonly;
	if(isReadonly){
		this.remove = readonlyError;
		this.add = readonlyError;
		this.shift = readonlyError;
	}
}