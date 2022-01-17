function(source){
	_.assertFunction(this.parent.adjustPath)
	var remainingCurrentPath = this.parent.adjustPath(this.objectId)
	console.log('adjusting path: ' + JSON.stringify(remainingCurrentPath) + ' -> +' + source)
	if(remainingCurrentPath.length === 0){
		this.persistEdit('selectProperty', {typeCode: source})
		return []
	}else if(remainingCurrentPath[0] !== source){
		if(remainingCurrentPath.length > 1){
			if(remainingCurrentPath.length < 6){
				console.log('ascending due to remainingCurrentPath ' + remainingCurrentPath[0] + ' ' + source)
				this.persistEdit('ascend'+(remainingCurrentPath.length-1), {})
			}else{
				this.persistEdit('ascend', {many: remainingCurrentPath.length-1})
			}
		}
		this.persistEdit('reselectProperty', {typeCode: source})
		return []
	}else{
		return remainingCurrentPath.slice(1)
	}
}