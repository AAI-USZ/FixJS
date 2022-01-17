function valueOrId(value){
	if(value.__id){//if it is a handle to an externalized object (static or sync), reference by ID
		return value.__id;
	}else if(value.objectId){
		_.assertInt(value.objectId)
		return value.objectId
	}else{
		_.assertPrimitive(value)
		return value;
	}
}