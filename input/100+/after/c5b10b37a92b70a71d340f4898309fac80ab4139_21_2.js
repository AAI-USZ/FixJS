function viewExprHash(e){
	var s = ''
	if(e.type === 'view'){
		e.params.forEach(function(ep){
			s += viewExprHash(ep)
		})
	}else if(e.type === 'value'){
		s += JSON.stringify(e.value)
	}else if(e.type === 'int'){
		s += JSON.stringify(e.value)
	}else if(e.type === 'macro'){
		s += viewExprHash(e.expr)
	}else if(e.type === 'param'){
		//console.log('e: ' + JSON.stringify(e))
		_.assertObject(e.schemaType)
		s += JSON.stringify(e.schemaType)
	}else{
		_.errout('TODO: ' + JSON.stringify(e))
	}
	return s
}