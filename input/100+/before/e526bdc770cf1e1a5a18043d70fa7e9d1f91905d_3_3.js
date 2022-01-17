function() {
	  // override cross domain behavior
	  var options = {
		  allowCrossDomainPages : true
	  };
	  // override form submission behavior for desktop version
	  if (TissueStack.desktop) {
		  options.ajaxEnabled = false;
	  }
	  
	  $.extend(  $.mobile , options);

	var afterLoadingRoutine = function() {
		// create an instance of the navigation
		TissueStack.dataSetNavigation = new TissueStack.DataSetNavigation();
		// on the first load we always display the first data set received from the backend list
		TissueStack.dataSetNavigation.addToOrReplaceSelectedDataSets(
				TissueStack.dataSetStore.getDataSetByIndex(0).id, 0);
		 // show first one by default
		TissueStack.dataSetNavigation.showDataSet(1);

		
		// initialize ui and events
		TissueStack.InitUserInterface();
		TissueStack.BindDataSetDependentEvents();
		TissueStack.BindGlobalEvents();

		// add admin functionality to desktop
		if (TissueStack.desktop) {
			TissueStack.admin = new TissueStack.Admin();
		}
	};
	// call asynchronous init
	TissueStack.Init(afterLoadingRoutine);

}