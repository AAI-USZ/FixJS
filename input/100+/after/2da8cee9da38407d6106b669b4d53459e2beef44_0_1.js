function () {
		var record = this.getSelectionModel().getLastSelected();
		
		if (!record) {
			// Nothing is selected, use the root node's ID as category
			this.fireEvent("itemAdd", { category: this.getRootNode().get("id") });
		}
    	
    	if (record.self.getName() == "PartKeepr.FootprintCategory") {
    		// Selected node is a footprint category
    		this.fireEvent("itemAdd", { category: record.get("id") });
    	} else {
    		// Selected node is a footprint
    		if (record.parentNode && record.parentNode.self.getName() == "PartKeepr.FootprintCategory") {
    			// Selected parent node is a category, perfect. Let's use this 
    			this.fireEvent("itemAdd", { category: record.parentNode.get("id") });	
    		} else {
    			// Something went probably wrong, use the root node
    			this.fireEvent("itemAdd", { category: this.getRootNode().get("id") });
    		}	
    		
    	}
	}