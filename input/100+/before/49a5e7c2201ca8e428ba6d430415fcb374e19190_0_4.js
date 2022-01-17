function(data, textStatus, jqXHR) {
 								if (!data.response && !data.error) {
 									_this.replaceErrorMessage("No Data Set Updated!");
 									return false;
 								}
 								if (data.error) {
 									var message = "Error: " + (data.error.message ? data.error.message : " No Data Set Updated!");
 									_this.replaceErrorMessage(message);				
 									return false;
 								}
 								if (data.response.noResults) {
 									_this.replaceErrorMessage("No Results!");
 									return false;
 								}

 								var dataSet = data.response;
								var addedDataSet = TissueStack.dataSetStore.addDataSetToStore(dataSet, "localhost");
 								if (addedDataSet) {
 									if(TissueStack.desktop)	TissueStack.dataSetNavigation.addDataSetToDynaTree(addedDataSet);
	 								if (TissueStack.tablet) TissueStack.dataSetNavigation.addDataSetToTabletTree(addedDataSet);
	 								_this.displayUploadDirectory();
	 								_this.replaceErrorMessage("Data Set Has Been Added Successfully!");
	 								return false;
 								}
 							}