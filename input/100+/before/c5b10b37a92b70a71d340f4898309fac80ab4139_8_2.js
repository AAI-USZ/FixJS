function(desiredId){
	_.assertLength(arguments, 1);

	var a = this.getFromApiCache(desiredId);
	if(a) return a;

	var index = findListElement(this.obj, desiredId);
	if(index === undefined){
		_.errout('unknown id: ' + desiredId);
	}

	var e = this.obj[index];
		
	if(_.isInteger(e)){
		a = this.getObjectApi(desiredId);
		this.addToApiCache(desiredId, a);
	}else{
		a = this.wrapObject(e, [], this);
		this.addToApiCache(desiredId, a);
	}
	return a;
	
}