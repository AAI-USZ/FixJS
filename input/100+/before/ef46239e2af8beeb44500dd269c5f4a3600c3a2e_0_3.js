function(/*Boolean*/selected){
			// summary:
			//		Makes this widget in the selected or unselected state.
			this.inherited(arguments);
			if(selected){
				domClass.replace(this.bodyNode, this.selColor, this.defaultColor);
			}else{
				domClass.replace(this.bodyNode, this.defaultColor, this.selColor);
			}
			domClass.toggle(this.domNode, "mblToolBarButtonSelected", selected);
			domClass.toggle(this.bodyNode, "mblToolBarButtonBodySelected", selected);
			this._updateArrowColor();
		}