function(typeSchema, sh/*, snap, typeCode, id*/){
	_.assertLength(arguments, 2);
	_.assertObject(typeSchema);
	_.assertObject(sh);
	//_.assertObject(snap);

	return new SyncApi(typeSchema, sh/*, snap, typeCode, id*/);
}