function (dataSet) {
		for (var dataSetKey in TissueStack.dataSetStore.datasets) {
			var dataSet = TissueStack.dataSetStore.datasets[dataSetKey];
			(function(dataSet) {
				$("#tabletTreeDiv-" + dataSet.local_id + dataSet.host + "").click(function() {
					if(TissueStack.phone){
						TissueStack.Utils.adjustScreenContentToActualScreenSize(0);
					}
					_this.addToOrReplaceSelectedDataSets(dataSet.id, 0);
					_this.showDataSet(1);
					TissueStack.InitUserInterface();
					TissueStack.BindDataSetDependentEvents();
					//redirect to plane X for phone version
					if(TissueStack.phone){
						var urlSplit = document.location.href.split("#");
						var page = urlSplit[0];
						window.location = page + '#tissueX';
					}
				});
			})(dataSet);
		}
	}