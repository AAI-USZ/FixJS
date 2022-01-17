function(typeSchema, sh, snap, typeCode, id){
	_.assertLength(arguments, 5);
	_.assertObject(typeSchema);
	_.assertObject(sh);
	_.assertObject(snap);

	return new SyncApi(typeSchema, sh, snap, typeCode, id);
}