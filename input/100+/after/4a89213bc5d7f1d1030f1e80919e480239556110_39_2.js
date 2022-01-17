function(){
			// summary:
			//		Updates the back button.
			array.forEach(this.leftList.getChildren(), function(item){
				var id = this.getDestinationId(item);
				var view = registry.byId(id);
				if(view){
					var heading = array.filter(view.getChildren(), function(c){ return c.declaredClass.indexOf("Heading") !== -1; })[0];
					if(heading.backButton){
						heading.backButton.domNode.style.display = this.isPhone() ? "" : "none";
					}
					if(heading.backBtnNode){ // TODO: remove this block later
						heading.backBtnNode.style.display = this.isPhone() ? "" : "none";
					}
				}
			}, this);
		}