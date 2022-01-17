function(args){
	if(this === window){throw 'JIM TYPE ERROR';}
	if(arguments.length > 1){throw 'ob3D expects only one param, an object with the named arguments.';}
	var args = args || {};
	NPos3d.blessWith3DBase(this,args);
	return this;
}