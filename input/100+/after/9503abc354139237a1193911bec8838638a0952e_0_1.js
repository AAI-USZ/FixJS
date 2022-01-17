function(){
			listsmodel = this.loadedModels.listsmodel;

			var signal;

			registry.byId("detail_showMore").on("click", function(){
				showMoreDetail();
			});

			// use _this.backFlag to identify the EditTodoItem view back to items,ViewListTodoItemsByPriority view
			registry.byId("detail_back").on("click", lang.hitch(this, function(evt){
				this._backFlag = true;
				history.back();
			}));

			registry.byId("markAsComplete").on("click", lang.hitch(this, function(){
				isComplete = true;
				isDelete = false;
				dom.byId("dlg_title").innerHTML = "Mark As Complete";
				dom.byId("dlg_text").innerHTML = "Are you sure you want to mark this item as complete?";
				show();
			}));

			registry.byId("deleteCurrentItem").on("click", lang.hitch(this, function(){
				isComplete = false;
				isDelete = true;
				dom.byId("dlg_title").innerHTML = "Delete";
				dom.byId("dlg_text").innerHTML = "Are you sure you want to delete this item?";
				show();
			}));

			registry.byId("confirm_yes").on("click", lang.hitch(this, function(){
				var datamodel = this.app.currentItemListModel;
				var index = this.app.selected_item;
				if(isComplete){
					datamodel.model[index].set("completed", true);
				}else if(isDelete){
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
			}));

			registry.byId("confirm_no").on("click", lang.hitch(this, function(){
				hide();
			}));
		}