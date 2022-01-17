function(cb, endCb){

	if(this.obj === undefined){
		if(endCb) endCb();
		return;
	}
	var local = this;

	for(var i=0;i<this.obj.length;++i){

		var id = this.obj[i];
		var actualId =  _.isInteger(id) ? id : id.meta.id
		
		console.log('obj: ' + JSON.stringify(this.obj[i]))
		_.assertInt(actualId);

		var a = local.getFromApiCache(actualId);
		
		if(a === undefined){
			if(_.isInteger(id)){
				a = local.getObjectApi(actualId, local);
			}else{
				var obj = id;
				a = local.wrapObject(obj, [], local);
			}
			local.addToApiCache(actualId, a);
		}
		_.assertObject(a);
		a.prepare();
		cb(a, i);
	}
}