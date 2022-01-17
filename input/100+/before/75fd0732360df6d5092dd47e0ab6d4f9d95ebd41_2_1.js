function(obj){
	if(typeof obj !=="object")return obj;
	var result={};
	var t=this;
	if(Array.isArray(obj)){
		return obj.map(function(x){return t.jsonFilter(x)});
	}else if(obj instanceof Game.User){
		return {
			$type:"user",
			properties:this.propertiesJSON(obj),
		};
	}else if(obj instanceof EventEmitter){
		return {
			$type:"EventEmitter",
		};
	}else if(!obj._constructor){
		//普通のオブジェクトだ
		return this.propertiesJSON(obj);
	}else{
		// 特殊オブジェクトだ
		return {
			$type:"obj",
			constructorName:obj._constructor.name,
			properties:this.propertiesJSON(obj),
		};
	}
	for(var key in obj){
		var value=obj[key];
		if(typeof value !=="object"){
			result[key]=value;
		}else if(value){
		}
	}
	return result;
}