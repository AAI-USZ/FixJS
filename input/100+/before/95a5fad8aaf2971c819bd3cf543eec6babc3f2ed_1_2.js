function(){
				var datamodel = this.app.currentItemListModel;
				var index = this.app.selected_item;
				if(_isComplete){
					datamodel.model[index].set("completed", true);
				}else if(_isDelete){
					var datamodel = this.app.currentItemListModel.model;
					var len = datamodel.length;
					//remove from current datamodel
					if(index>=0 && index<len){
						datamodel.splice(index, 1);
					}
				}
				this.app.currentItemListModel.commit(); // commit updates
				//hide confirm dialog
				hide();
				//transition to list view
				var transOpts = {
						title:"List",
						target:"items,ViewListTodoItemsByPriority",
						url: "#items,ViewListTodoItemsByPriority"
				};
				var e = window.event;
				new TransitionEvent(dom.byId("item_detailsGroup"), transOpts, null).dispatch();
			}