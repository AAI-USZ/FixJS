function(childIndexInFocus){
		var container = this.container,
			numofChildren = container.children.length;
		if(childIndexInFocus!=-1){
			container.children[childIndexInFocus].removeClass('highlight');
		}
		if(childIndexInFocus===numofChildren-1) {
			childIndexInFocus=-1;
			this.wasLastChild= true;
		} else {
			this.wasLastChild = false;
		}
		childIndexInFocus++;

		return childIndexInFocus;
	}