function(e){
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getPreviousIndex(childIndexInFocus);

			this.bringChildtoFocus(container.children[newindex]);
			container.childIndexInFocus=newindex;
	}