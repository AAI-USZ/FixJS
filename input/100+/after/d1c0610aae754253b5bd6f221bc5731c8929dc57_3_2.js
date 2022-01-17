function(shiftRight){
		var registry = this.get('registry'),
			index;
		if(registry.length>0){
			index = this.getNextRegistryIndex(shiftRight);
			if(index!== null && registry[index]){
				var node = Y.one(registry[index].node);

				if(node){
					this.deactivateRegisteredContainer();
					this.registerContainer(node);
					this.initiateNavigation();
				} else {
					this.deactivateRegisteredContainer();
					Y.log('Registered Container does not exist:id='+registry[index].node);
				}
			}
		} else {
			Y.log('nothing was registered for navigation');
		}
    }