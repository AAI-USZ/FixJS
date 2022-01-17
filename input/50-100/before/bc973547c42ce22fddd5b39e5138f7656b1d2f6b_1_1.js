function(){
			if(!this.store){
				var srcNodeRef = this.srcNodeRef;
				var list = this.list;
				if(list){
					this.store = registry.byId(list);
				}
			}
			this.inherited(arguments);
		}