function(){
				var datamodel = this.loadedModels.listsmodel.model;
				var len = datamodel.length;
				var index = this._deleteListIndex;
				if(index >= 0 && index < len){
					datamodel.splice(index, 1);
				}
				//hide confirm dialog
				hide();
			}