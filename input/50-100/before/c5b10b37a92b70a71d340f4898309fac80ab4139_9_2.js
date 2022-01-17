function(desiredId){
	
	if(this.obj === undefined){
		//_.errout('unknown id: ' + desiredId);
		return false;
	}
	
	var a = this.getFromApiCache(desiredId);
	if(a){
		return true;
	}
	
	var arr = this.obj;

	for(var i=0;i<arr.length;++i){
		var idOrObject = arr[i];
		if(_.isInteger(idOrObject)){
			if(desiredId === idOrObject) return true;
		}
	}

	return false;
}