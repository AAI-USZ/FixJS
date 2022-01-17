function(childIndexInFocus){
		var container = this.container,
			numofChildren = container.children.length;
		if(childIndexInFocus!=-1){
			container.children[childIndexInFocus].removeClass('highlight');
		}
		if(childIndexInFocus===numofChildren-1) {
			childIndexInFocus=-1;
			this.wasChildLast= true;
		} else {
			this.wasChildLast = false;
		}
		childIndexInFocus++;

		return childIndexInFocus;
	}