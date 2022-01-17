function MapHandle(typeSchema, obj, part, parent){
	this.part = part;
	this.obj = obj || {};
	this.parent = parent;
	this.schema = typeSchema;
	
	if(this.schema.type.value.type === 'primitive'){
		this.putOp = u.getPutOperator(this.schema)
		this.keyOp = u.getKeyOperator(this.schema)
	}
}