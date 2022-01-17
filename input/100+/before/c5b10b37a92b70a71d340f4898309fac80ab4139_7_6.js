function(propertyName){
	if(this.obj === undefined) return false;
	var pt = this.typeSchema.properties[propertyName];
	if(pt === undefined) _.errout('not a valid property(' + propertyName + ') for this type: ' + this.typeSchema.code)
	_.assertDefined(pt);
	if(pt.type.type === 'object' && pt.tags['always_local']) return true;
	var pv = this.obj[pt.code]//getPropertyValue(this.obj, pt.code);
	return pv !== undefined;
}