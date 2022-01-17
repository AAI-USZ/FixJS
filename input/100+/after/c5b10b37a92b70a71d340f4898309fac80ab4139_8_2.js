function(desiredId){
	_.assertLength(arguments, 1);
	_.assertInt(desiredId)
	
	/*if(this.objectApiCache === undefined){
		console.log('got ids: ' + JSON.stringify(_.map(this.obj, function(v){return v.id();})))
		return
	}*/
	//var res = this.objectApiCache[desiredId]//
	var res = u.findObj(this.obj, desiredId)
	
	if(res){
		res.prepare()
		return res
	}else{
		//console.log('got ids: ' + JSON.stringify(_.map(this.obj, function(v){return v.id();})))
		//_.errout('object with that id not in list: ' + desiredId)
		//console.log('got: ' + JSON.stringify(this.obj))
		//console.log('got*: ' + JSON.stringify(this.objectApiCache))
	}
}