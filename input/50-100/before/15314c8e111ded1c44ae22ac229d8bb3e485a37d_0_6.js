function(e){
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus;
				newindex = this.getPreviousIndex(childIndexInFocus);

			Y.log('onkeyup:Infocus:'+newindex);
			this.bringChildtoFocus(container.children[newindex]);
			//var childInFocus = container.children[newindex];
			//childInFocus.addClass('highlight').focus();
			//this.scrollToCenter(childInFocus);
			container.childIndexInFocus=newindex;
	}