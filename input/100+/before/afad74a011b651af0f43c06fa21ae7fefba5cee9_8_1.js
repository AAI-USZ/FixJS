function(event){
    	this.changeToSimple(this.newnessList,event);
    	if(this.newness == null){
    		var newness = new NewnessListView({isOwner: this.user.get("isOwner"), name:this.user.get("firstName"), collection: new NewnessList()});
    		this.newness = newness;
    		$(this.el).find("#newness-container").html(this.newness.render().el);
    	}
    	
    	
    }