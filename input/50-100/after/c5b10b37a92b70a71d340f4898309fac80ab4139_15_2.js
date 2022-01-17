function(collectionType, typeSchema){
	if(typeSchema.type.members.primitive === 'string') return _.assertString
	else if(typeSchema.type.members.primitive === 'int') return _.assertInt
	else if(typeSchema.type.members.primitive === 'long') return _.assertNumber
	else if(typeSchema.type.members.primitive === 'boolean') return _.assertBoolean
	else _.errout('TODO: ' + typeSchema.type.members.primitive)
}