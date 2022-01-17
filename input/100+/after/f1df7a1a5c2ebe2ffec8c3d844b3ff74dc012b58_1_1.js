function () {
	        var newItems = [],
	        	modifiedItems = [],
	        	model;
	        
	        YArray.each(this._items, function(item, index){
	        	model = item.toJSON();
	        	
	        	if (item.isNew()) {
	        		console.log('Model is new');
	        		newItems.push(model);
	        	} else if (item.isModified() || model.position !== index) {
	        		console.log('Model has been modified');
	        		modifiedItems.push(model);
	        	}
	        	model.position = index;
	        }, this);
	        
	        return {newItems: newItems, modifiedItems: modifiedItems};
    	}