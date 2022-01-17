function(inSender, inEvent){
		//Put it in view:
		this.$.panels.setIndex(1);
		//Call the activate function with the name of the category:
		this.$.subactivity.onViewed(this.activitiesArray[inEvent.index]);
	}