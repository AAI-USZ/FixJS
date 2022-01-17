function(data) {
						  
					      if (data.ticker) {
						   var list = new stockListCollection();
					       list.add(data);
					       list.localSave(list.models);
					      } else {
					    	  alert('ticker not found');
					      } 
							window.stock.routers.workspaceRouter.navigate("#index",true);
				          }