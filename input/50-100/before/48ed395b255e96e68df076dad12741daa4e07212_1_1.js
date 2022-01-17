function(data) {
    this.conversationID  = data['conversationID'];
    
    //Call the parent logic.
    this._super(data);
    
    //Handle the rest of the data.
    if (data['conversationID']) {
      this.startChat(true);
      
    }
    
    if (data['loginHTML'] !== undefined && data['loginHTML']) {
      this.loginHTML = data['loginHTML'];
      WDN.jQuery("#wdn_feedback_comments").replaceWith(this.loginHTML);
      this.initWatchers();
    }
    
    this.displaySiteAvailability();
  }