function(){
    	//var params = this.options;
    	//params.thumbnail = window.getViewer().get('thumbnail');
    	$(this.el).html(template.section.start( {id: getViewer().get('id')} ));
    	
    	var newnessList = new NewnessListView({ collection: this.newnessCollection, isOwner:true});
    	var meetingList = new MeetingListView({ collection: this.meetingCollection, el: $(this.el).find("#meetings")});
    	//var contactSuggestionList = new ContactSuggestionListView({ collection: this.contactSuggestionCollection}); 
    	
    	
    	this.menu = new MultimenuView({original:newnessList, subsections:[meetingList], el: $(this.el).find("#multimenu")});
    	//this.menu = new MultimenuView({original:newnessList, subsections:['profile','search'], el: $(this.el).find("#meetings")});
    	this.menu.render();
		//$(this.el).html(template.section.start( params ));
		
    	//var newnessList = new NewnessListView({ el:$(this.el).find("#newness"), collection: this.newnessCollection});
    	
    	//$(this.el).find("#newness").html(newnessList.render().el);
    	/*var notificationList = new NotificationListView({ collection: this.notificationCollection});

    	var contactSuggestionList = new ContactSuggestionListView({ collection: this.contactSuggestionCollection});

    	var nearbyTaskList = new AgendaNearbyTaskListView({ collection: this.nearbyTaskCollection});
    	
    	var meetingList = new MeetingListView({ collection: this.meetingCollection});*/
		
		return this;
    }