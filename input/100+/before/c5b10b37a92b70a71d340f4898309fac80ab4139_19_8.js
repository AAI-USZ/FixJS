function getClassForType(typeSchema, isView){
	_.assertLength(arguments, 2)
	
	var type = typeSchema.type;
	//console.log(type);
	//console.log(typeSchema);
	if(type.type === 'primitive'){
		if(type.primitive === 'string') return StringHandle;
		else if(type.primitive === 'int') return IntHandle;
		else if(type.primitive === 'long') return LongHandle;
		else if(type.primitive === 'timestamp') return TimestampHandle;
		else if(type.primitive === 'boolean') return BooleanHandle;
		else if(type.primitive === 'binary') return BinaryHandle;
		else{
			_.errout('unknown primitive type, no class defined: ' + JSON.stringify(type));
		}
	}else if(type.type === 'list'){
		if(type.members.type === 'primitive'){
			return PrimitiveListHandle;
		}else{
			return ObjectListHandle;
		}
	}else if(type.type === 'set'){
		if(type.members.type === 'primitive'){
			return PrimitiveSetHandle;
		}else{
			if(isView){
				return ViewObjectSetHandle;
			}else{
				return ObjectSetHandle;
			}
		}
		//return SetHandle;
	}else if(type.type === 'object'){
		return ObjectHandle;
	}else if(type.type === 'map'){
		return MapHandle;
	}else if(type.type === 'view'){
		_.errout('should not call this for view: views are always TopObjectHandles');
	}else{
		_.errout('unknown type, no class defined: ' + JSON.stringify(type));
	}
}