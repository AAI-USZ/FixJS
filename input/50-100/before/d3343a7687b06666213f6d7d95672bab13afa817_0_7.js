function(args){
	var t = this;
	if(t===window){throw 'You must use the `new` keyword when calling a Constructor Method!';}
	var args = args || {};
	//Field Of View; Important!
	t.fov = args.fov || 550;
	t.clipNear = args.clipNear || t.fov; //This line is also VERY important! Never have the clipNear less than the FOV!
	t.clipFar = args.clipFar || -1000;
	t.pos = args.pos || [0,0,0];
	t.rot = args.rot || [0,0,0];//Totally not implemented yet.
}