function wrapCollection(local, arr){
	var res = []
	if(arr){
		arr.forEach(function(idOrObject){
			if(_.isInt(idOrObject) || _.isString(idOrObject)){
				var a = local.getObjectApi(idOrObject, local);
				res.push(a)
			}else{
				var a = local.wrapObject(idOrObject, [], local);
				res.push(a)
			}
		})
	}
	return res
}