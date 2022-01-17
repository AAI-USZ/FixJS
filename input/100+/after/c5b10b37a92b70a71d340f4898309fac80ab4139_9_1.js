function(already){
	var result = []
	//console.log(this + '.toJson(): ' + JSON.stringify(this.obj))
	for(var i=0;i<this.obj.length;++i){
		var obj = this.obj[i]
		result.push(obj.toJson(already))
	}
	return result
}