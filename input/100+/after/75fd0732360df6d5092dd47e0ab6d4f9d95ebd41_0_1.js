function executeJSON(game,obj){
	if(typeof obj!=="object" || !obj)return obj;
	if(obj.$type=="user"){
		//ユーザーオブジェクト
		var user=game.newUser();
		setProperties(user,executeJSON(game,obj.properties));
		return user;
	}else if(obj.$type=="EventEmitter"){
		return new EventEmitter;
	}else if(obj.$type=="obj"){
		//何か
		var constructor=window[obj.constructorName];
		if(!constructor)throw new Error(obj.constructorName);
		//既存のオブジェクトかどうかチェック
		for(var i=0,l=game.objects.length;i<l;i++){
			//既にある
			if(game.objects[i]._id==obj._id){
				return game.objects[i];
			}
		}
		var o=game._old_add(constructor,executeJSON(game,obj._param));
		//現在のパラメータ反映
		setProperties(o,obj.properties);
		return o;
	}else if(Array.isArray(obj)){
		return obj.map(function(x){return executeJSON(game,x)});
	}else{
		//ただのオブジェクト
		var ret={};
		for(var key in obj){
			ret[key]=executeJSON(game,obj[key]);
		}
		return ret;
	}

	function setProperties(obj,map){
		for(var key in map){
			var value=map[key];
			obj[key]=executeJSON(game,value);
		}
	}
}