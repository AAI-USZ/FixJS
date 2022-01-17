function valueOrId(value){
	if(value.__id){//if it is a handle to an externalized object (static or sync), reference by ID
		return value.__id;
	}else{
		return value;
	}
}