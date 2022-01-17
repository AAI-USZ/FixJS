function(desiredHandle){
	var desiredId = desiredHandle.id();
	
	for(var i=0;i<this.obj.length;++i){
		var id = this.obj[i];
		if(_.isInteger(id)){
			if(id === desiredId) return true;
		}else{
			if(id.meta.id === desiredId) return true;
		}
	}
	return false;
}