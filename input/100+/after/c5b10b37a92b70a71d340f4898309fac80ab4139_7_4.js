function(descentCode, op, edit, syncId, editId){
	if(op === 'setObject' || op === 'setViewObject'){
		_.assertInt(descentCode)
		var ps = this.typeSchema.propertiesByCode[descentCode];
		_.assertObject(ps)
		if(op === 'setObject'){
			_.assertEqual(ps.type.type, 'object')
		}
		var pv = this.cachedProperties[ps.name]
		if(pv && pv.objectId === edit.id){
			//already done
			console.log('setObject redundant (local view object?), skipping')
		}else{
			console.log('set to: ' + edit.id + ' ' + descentCode + ' ' + this.objectId + ' ' + ps.name)
			var setObj = this.getObjectApi(edit.id)

			this.obj[descentCode] = setObj;
			if(this.prepared){
				setObj.prepare()
				this[ps.name] = setObj
			}
			this.emit(edit, 'set', setObj)			
		}
	}else{
		_.errout('TODO: ' + op)
	}
}