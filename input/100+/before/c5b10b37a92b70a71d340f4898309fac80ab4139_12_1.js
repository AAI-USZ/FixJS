function StringHandle(typeSchema, obj, part, parent){
	this.part = part;
	this.parent = parent;
	
	if(obj === undefined){
		_.each(typeSchema.tags, function(value, tag){
			if(tag.indexOf('default:') === 0){
				var defStr = tag.substr(tag.indexOf(':')+1);
				defStr = JSON.parse(defStr);
				obj = defStr;
			}
		});
	}
	this.obj = obj;
}