function() {
		var registry = this.get('registry'),
			regLen,
			regIndex;

		if(registry && registry.length>0) { //if no registry exists then nothing was registered
			regLen = registry.length;
			regIndex = this.get('activeRegistryIndex');
			
			if(regIndex===null){
				regIndex = 0;
			}else{
				regIndex++;
				if(regIndex>=regLen){
					regIndex = 0;
				}
			}

			this.set('activeRegistryIndex',regIndex);
			Y.log('NextRegistryIndex:'+this.get('activeRegistryIndex'));
			return regIndex;
		}
		return null;
	}