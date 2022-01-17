function(childInFocus){

		childInFocus.addClass('highlight').focus();
		if(this.wasLastChild){
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
			childInFocus.scrollIntoView(); //this is a temp fix try to remove this and fix navigation later
		}
		this.scrollToCenter(childInFocus);
	}