function() {
					_this.addToOrReplaceSelectedDataSets(dataSet.id, 0);
					_this.showDataSet(1);
					TissueStack.InitUserInterface();
					TissueStack.BindDataSetDependentEvents();
				}