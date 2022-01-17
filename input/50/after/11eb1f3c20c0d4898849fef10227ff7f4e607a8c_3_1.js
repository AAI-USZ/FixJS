function(index){
		// summary:
		//		Called to move to the repeatdetails page when an item is selected on the Repeat Data Binding page. 
		//
		// index: string
		//		The index of the item to show in the repeatdetails page. 
		//
		listCtl.set("cursorIndex", index);
		registry.byId("firstInput").focus();
	}