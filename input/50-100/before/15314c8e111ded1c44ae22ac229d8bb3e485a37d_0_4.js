function(childInFocus){
		childInFocus.addClass('highlight').focus();
		if(this.wasChildLast){
			Y.log('last child');
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
			childInFocus.scrollIntoView();
		}
		this.scrollToCenter(childInFocus);
	}