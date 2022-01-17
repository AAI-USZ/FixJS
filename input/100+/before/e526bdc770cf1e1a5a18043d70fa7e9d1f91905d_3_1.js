function() {
		var dataSetCount = TissueStack.dataSetNavigation.selectedDataSets.count;
		
		TissueStack.Utils.adjustScreenContentToActualScreenSize(dataSetCount);
		// set new canvas dimensions
		for (var i=0;i<dataSetCount;i++) {
			var dataSet = TissueStack.dataSetStore.getDataSetById(TissueStack.dataSetNavigation.selectedDataSets["dataset_" + (i+1)]);
			for (var plane in dataSet.planes) {
				dataSet.planes[plane].resizeCanvas();
			}
		}
	}