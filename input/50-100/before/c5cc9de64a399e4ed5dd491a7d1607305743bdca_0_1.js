function(){
				var datamodel = this.loadedModels.listsmodel;
				var len = datamodel.length;
				var index = this.deleteList;				
				if(index >= 0 && index < len){
					datamodel.splice(index, 1);
				}
				//hide confirm dialog
				hide();
			}