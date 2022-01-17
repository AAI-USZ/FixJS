function () {
		var r = this.getSelectionModel().getLastSelected();
    	
    	if (r && !r.get("footprintId")) {
    		this.fireEvent("itemAdd", { category: r.get("id") });
    	} else {
    		if (!r) {
    			this.fireEvent("itemAdd", this.getRootNode().get("id"));
    		} else {
    			/* Try to find the category's parent id */
        		if (r.parentNode && !r.parentNode.get("footprintId")) {
        			this.fireEvent("itemAdd", { category: r.parentNode.get("id") });	
        		} else {
        			this.fireEvent("itemAdd", this.getRootNode().get("id"));
        		}	
    		}
    		
    	}
	}