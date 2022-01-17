function adjustObjectCollectionPath(source){
	console.log('adjust object collection path ' + source)
	var remainingCurrentPath = this.parent.adjustPath(this.part)
	if(remainingCurrentPath.length === 0){
		console.log('zero')
		this.persistEdit('selectObject', {id: source})
		return []
	}else if(remainingCurrentPath[0] !== source){
		console.log('different')
		if(remainingCurrentPath.length > 1){
			if(remainingCurrentPath.length < 6){
				console.log('primitive ascending ' + remainingCurrentPath[0])
				this.persistEdit('ascend'+(remainingCurrentPath.length-1), {})
			}else{
				this.persistEdit('ascend', {many: remainingCurrentPath.length-1})
			}
		}else{
			console.log('reselecting')
		}
		this.persistEdit('reselectObject', {id: source})
		return []
	}else{
		console.log('same')
		return remainingCurrentPath.slice(1)
	}
}