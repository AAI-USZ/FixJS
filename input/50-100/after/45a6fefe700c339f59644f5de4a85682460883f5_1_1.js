function() {
		// create an instance of the navigation
		TissueStack.dataSetNavigation = new TissueStack.DataSetNavigation();
		// on the first load we always display the first data set received from the backend list
		TissueStack.dataSetNavigation.addToOrReplaceSelectedDataSets(
				TissueStack.dataSetStore.getDataSetByIndex(0).id, 0);
		
		// initialize ui and events
		TissueStack.InitUserInterface();
		TissueStack.BindDataSetDependentEvents();
		TissueStack.BindGlobalEvents();

		// add admin functionality to desktop
		if (TissueStack.desktop) {
			TissueStack.admin = new TissueStack.Admin();
		}
	}