function adjustMapPath(key){
	console.log('adjust map path ' + key)
	var remainingCurrentPath = this.parent.adjustPath(this.part)
	if(remainingCurrentPath.length === 0){
		console.log('zero')
		this.persistEdit(this.keyOp, {key: key})
		return []
	}else if(remainingCurrentPath[0] !== key){
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
		this.persistEdit('re'+this.keyOp, {key: key})
		return []
	}else{
		console.log('same')
		return remainingCurrentPath.slice(1)
	}
}