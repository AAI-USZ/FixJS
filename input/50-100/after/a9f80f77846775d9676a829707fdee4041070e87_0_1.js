function() {
					if(TissueStack.phone){
						TissueStack.Utils.adjustScreenContentToActualScreenSize(0);
					}
					_this.addToOrReplaceSelectedDataSets(dataSet.id, 0);
					_this.showDataSet(1);
					TissueStack.InitUserInterface();
					TissueStack.BindDataSetDependentEvents();
					$("#tabletTreeDiv-" + dataSet.local_id + dataSet.host + "").trigger("expand");
				}