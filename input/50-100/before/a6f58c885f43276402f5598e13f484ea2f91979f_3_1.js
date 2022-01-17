function(data) {
						   var list = new stockListCollection();
					       list.add(data);
					       list.localSave(list.models);
							window.stock.routers.workspaceRouter.navigate("#index",true);
				          }