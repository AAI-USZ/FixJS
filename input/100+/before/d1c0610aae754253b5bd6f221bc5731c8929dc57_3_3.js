function(childInFocus){

		childInFocus.addClass('highlight').focus();
		if(this.anim && this.anim.get('running')){
			this.anim.pause();
		}


		if(this.wasLastChild){
			Y.log('last child');
			//this needs to be outside since both up and down needs this
			childInFocus.scrollIntoView(); //this is a temp fix try to remove this and fix navigation later
		}


		if(this.container.childIndexInFocus===0){
			childInFocus.scrollIntoView();
		}
		var amounttoScroll = this.scrollToCenter(childInFocus);
		//window.scroll(0,amounttoScroll);
		this.animateScroll(amounttoScroll);
	}