function(){
	var result = {};
	if(this.schema.type.value.type === 'primitive'){
		result = JSON.parse(JSON.stringify(this.obj));
	}else{
		this.each(function(key, value){
			result[key] = value.toJson();
		});
	}
	return result;
}