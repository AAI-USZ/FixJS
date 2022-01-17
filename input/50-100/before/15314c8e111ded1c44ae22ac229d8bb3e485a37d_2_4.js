function(e){
			this.wasChildLast = false; //for handling some edge case where on down key we navigate back to 1st child.
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getNextIndex(childIndexInFocus);
			this.bringChildtoFocus(container.children[newindex]);
			container.childIndexInFocus=newindex;
	}