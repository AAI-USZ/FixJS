function(desiredKey){
	_.assertLength(arguments, 1);

	if(this.obj === undefined) return;

	var idOrValue = this.obj[desiredKey];
	if(idOrValue === undefined) return;
	
	if(this.schema.type.value.type === 'object'){
		//var a = this.apiCache[idOrValue];
		if(_.isInteger(idOrValue)){
			var a = this.getObjectApi(idOrValue, this);
			return a;
		}else{
			_.assertDefined(idOrValue)
			var a = this.wrapObject(idOrValue, [], this);
			return a;
		}
	}else if(this.schema.type.value.type === 'primitive'){
		return idOrValue;
	}else{
		_.errout('TODO: ' + JSON.stringify(this.schema));
	}
}