function(propertyName){
	var pt = this.typeSchema.properties[propertyName];
	return pt.type.type === 'primitive';
}