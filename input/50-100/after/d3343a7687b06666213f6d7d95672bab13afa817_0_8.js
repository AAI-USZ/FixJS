function (args) {
	var args = args || {};
	if (this === window) {throw 'You must use the `new` keyword when calling a Constructor Method!';}
	if (arguments.length > 1) {throw 'ob3D expects only one param, an object with the named arguments.';}
	NPos3d.blessWith3DBase(this,args);
	return this;
}