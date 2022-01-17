function(){
			if(this._started){ return; }
			this.inherited(arguments);
			if(this.selectedChildWidget){
				this.selectedChildWidget._wrapperWidget.set("selected", true);
			}
		}