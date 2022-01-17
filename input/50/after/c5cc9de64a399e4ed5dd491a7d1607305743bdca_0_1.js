function(e){
				// stop transition because listsmodel update will trigger transition to items,ViewListTodoItemsByPriority view by default.
				this.app.stopTransition = true;

				var index = getIndexFromId(e.target, "editList");
				this._deleteListIndex = index;
				show();
			}