function() {
    /* This method is called several times thoughout 
     * executation.  Thus in order to stop the stacking
     * of watch functions, we should always unbind previous 
     * watch functions before applying the new ones.
     */
    WDN.jQuery('#visitorChat_container, ' +
            '#visitorChat_email_fallback, ' +
            '#visitorChat_logout, ' +
            '#visitorChat_login_submit, ' +
            '#visitorChat_header, ' +
            '#visitorChat_chatBox > ul > li').unbind();
    
    //Reveal timestamp
    WDN.jQuery("#visitorChat_chatBox > ul > li").hover(
      function () {
        WDN.jQuery(this).children(".timestamp").animate({'opacity': '1'}, 120);
        WDN.jQuery(this).children(".stamp").animate({'opacity': '1'}, 120);
      }, function () {
        WDN.jQuery(this).children(".timestamp").animate({'opacity': '0'}, 120);
        WDN.jQuery(this).children(".stamp").animate({'opacity': '0.65'}, 120);
      }
    );
    
    //Make sure the footer input is only submitting as email
    WDN.jQuery("#visitorChat_footercontainer #visitorChat_login_chatmethod").val("EMAIL");
    
    //Make sure the chat input is only submitting as chat.
    WDN.jQuery("#visitorChat_container #visitorChat_login_chatmethod").val("CHAT");
    
    //Validator
    WDN.jQuery('#visitorchat_clientLogin').validation();
    
    WDN.jQuery('#visitorChat_footercontainer #visitorchat_clientLogin').bind('validate-form', function(event, result) {
      if (result) {
        VisitorChat.startEmail();
      }
      return true;
    });
    
    //Call the parent
    this._super();
    
    //Click header to open up Chat
    WDN.jQuery('#visitorChat_header').click(function(){
      if (!WDN.jQuery('#visitorChat_container').is(":visible")) {
        WDN.jQuery("#visitorChat_container").slideDown(320);
      } else {
        WDN.jQuery("#visitorChat_container").slideUp(320);
      }
      
      if (VisitorChat.chatOpened) {
        if (VisitorChat.chatStatus == 'CHATTING' || VisitorChat.chatStatus == 'OPERATOR_PENDING_APPROVAL') {
          return false;
        }
        VisitorChat.stop();
      } else {
        VisitorChat.startChat();
      }
        
      return false;
    });
    
    //Logout function
    WDN.jQuery('#visitorChat_logout').click(WDN.jQuery.proxy(function(){
      if (!VisitorChat.confirmClose()) {
        return false;
      }
      
      VisitorChat.stop();
      
      return false;
    }, this));
    
    //Field watermarks
    WDN.jQuery("#visitorChat_name").watermark("Name (Optional)");
    WDN.jQuery("#visitorChat_email").watermark("Email (Required)");
    WDN.jQuery("#visitorChat_messageBox").watermark("Question or comment?");
    
    //if email_fallback is checked, make sure that the email is required.
    WDN.jQuery("#visitorChat_email_fallback").click(function(){
      if(WDN.jQuery(this).is(":checked")) {
        WDN.jQuery("#visitorChat_email").watermark("Email (Required)");
        WDN.jQuery('#visitorChat_email').addClass('required-entry');
      } else {
        WDN.jQuery("#visitorChat_email").watermark("Email (Optional)");
        WDN.jQuery('#visitorChat_email').removeClass('required-entry');
      }
    });
    
    WDN.jQuery("#visitorChat_container").ready(function(){
      //Are there no operators available?  If not, make email_fallback checked by default.
      if (!this.operatorsAvailable) {
        WDN.jQuery('#visitorChat_email_fallback').prop("checked", true);
        WDN.jQuery('#visitorChat_email').addClass('required-entry');
      }
    });
    
    //This will slide down the Name and Email fields, plus the Ask button
    WDN.jQuery("#visitorChat_messageBox").keyup(function(){
        WDN.jQuery(".visitorChat_info, #visitorChat_login_submit").slideDown("fast");
    });
  }