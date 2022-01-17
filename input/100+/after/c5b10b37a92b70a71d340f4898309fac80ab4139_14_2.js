function(source){
	_.assertLength(arguments, 1)
	_.assert(source > 0)
	
	var currentPath = this.currentPath
	if(currentPath === undefined) currentPath = this.currentPath = []
	console.log('adjust top path: ' + JSON.stringify(currentPath) + ' -> ' + source)
	
	if(currentPath.length === 0){
		_.assertInt(source)
		this.persistEdit('selectProperty', {typeCode: source})
		return []
	}else if(currentPath[0] !== source){
		if(currentPath.length > 1) this.reduceBy(currentPath.length-1)
		this.persistEdit('reselectProperty', {typeCode: source})
		return []
	}else{
		return this.currentPath.slice(1)
	}
}