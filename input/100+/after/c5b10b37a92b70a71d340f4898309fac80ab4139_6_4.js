function(){
	var result = {};
	if(this.schema.type.value.type === 'primitive'){
		result = JSON.parse(JSON.stringify(this.obj));
	}else if(this.schema.type.value.type === 'set'){
		if(this.schema.type.value.members.type === 'primitive'){
			this.each(function(key, value){
				if(result[key] === undefined) result[key] = []
				result[key].push(value);
			});
		}else{
			this.each(function(key, value){
				if(result[key] === undefined) result[key] = []
				result[key].push(value.toJson());
			});
		}
	}else{
		this.each(function(key, value){
			result[key] = value.toJson();
		});
	}
	return result;
}