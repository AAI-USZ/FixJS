function(){
	
	if(this.schema.type.members.type === 'primitive'){
		if(this.obj !== undefined){
			return [].concat(this.obj);
		}else{
			return [];
		}
	}else{
		var result = [];
		var local = this;
		var fullSchema = local.getFullSchema();
		var arr = this.obj;
		for(var i=0;i<arr.length;++i){
			var objOrId = arr[i];
			if(_.isInteger(objOrId)){
				var a = getObject(local, objOrId);
				result.push(a.toJson());
			}else{
				_.errout('TODO');
			}
		}

		return result;
	}	
}