function property(propertyCode){
	console.log('getting property: ' + propertyCode)
	//console.log(JSON.stringify(this.typeSchema.propertiesByCode))
	var propertyName = this.typeSchema.propertiesByCode[propertyCode].name
	return this.property(propertyName)
}