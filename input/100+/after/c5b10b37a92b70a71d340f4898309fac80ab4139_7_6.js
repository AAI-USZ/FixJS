function(propertyName){
	if(this.obj === undefined) return false;
	var pt = this.typeSchema.properties[propertyName];
	if(pt.type.type === 'set' || pt.type.type === 'list' || pt.type.type === 'map') return true
	if(pt === undefined) _.errout('not a valid property(' + propertyName + ') for this type: ' + this.typeSchema.code)
	_.assertDefined(pt);
	if(pt.type.type === 'object' && pt.tags['always_local']) return true;
	var pv = this.obj[pt.code]//getPropertyValue(this.obj, pt.code);
	//console.log('has ' + this.obj[pt.code] + ' ' + pt.code + ' ' + this.objectId)
	if(pv && pv.isReadonlyAndEmpty){
		return false
	}
	
	if(this.isReadonlyAndEmpty) return
	
	var n = this.cachedProperties[propertyName];
	if(n && !n.isReadonlyAndEmpty && n.value){
		if(n.value() !== undefined) return true//TODO do something better about updating object properties in the parent?
	}
	return pv !== undefined;
}