function(){
			// summary:
			//		Shows the left-side view.
			this.leftPane.domNode.style.display = this.isPhone() ? "none" : "";
			this.leftView.show();
		}