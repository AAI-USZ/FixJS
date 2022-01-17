function(e){
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getPreviousIndex(childIndexInFocus);

			Y.log('onkeyup:Infocus:'+newindex);
			this.bringChildtoFocus(container.children[newindex]);
			container.childIndexInFocus=newindex;
	}