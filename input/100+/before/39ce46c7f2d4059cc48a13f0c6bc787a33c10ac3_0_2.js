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
      
      //set the for_url
      WDN.jQuery('#initial_url').val(document.URL);
      WDN.jQuery('#initial_pagetitle').val(WDN.jQuery(document).attr('title'));
    }
    
    this.displaySiteAvailability();
  }