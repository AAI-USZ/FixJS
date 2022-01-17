function(cb, endCb){
	_.each(this.obj, function(obj){
		obj.prepare()
		cb(obj)
	})
	if(endCb) endCb()
}