function(data) {
    		console.log('from server');
    		var entity = self.getEntity(data.id);

    		var isAnimated = (entity.animationList[data.name] != undefined) ? true : false;
    		entity.setSkin(data.name, isAnimated);
    	}