function() {
      var btn = this;
      var frm = $(btn).parents('form').get(0);
      
      // Handler before submitting
      $(frm).triggerHandler('BeforeDiscussionSubmit', [frm, btn]);
      
      var textbox = $(frm).find('textarea');
      var inpDiscussionID = $(frm).find(':hidden[name$=DiscussionID]');
      var inpDraftID = $(frm).find(':hidden[name$=DraftID]');
      var preview = $(btn).attr('name') == $('#Form_Preview').attr('name') ? true : false;
      var draft = $(btn).attr('name') == $('#Form_SaveDraft').attr('name') ? true : false;
      var postValues = $(frm).serialize();
      postValues += '&DeliveryType=VIEW&DeliveryMethod=JSON'; // DELIVERY_TYPE_VIEW
      postValues += '&'+btn.name+'='+btn.value;
      gdn.disable(btn);
      
      $.ajax({
         type: "POST",
         url: $(frm).attr('action'),
         data: postValues,
         dataType: 'json',
         error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('div.Popup').remove();
            $.popup({}, XMLHttpRequest.responseText);
         },
         success: function(json) {
            json = $.postParseJson(json);
            
            // Remove any old popups if not saving as a draft
            if (!draft)
               $('div.Popup').remove();

            // Assign the discussion id to the form if it was defined
            if (json.DiscussionID != null)
               $(inpDiscussionID).val(json.DiscussionID);
               
            if (json.DraftID != null)
               $(inpDraftID).val(json.DraftID);

            // Remove any old errors from the form
            $(frm).find('div.Errors').remove();

            if (json.FormSaved == false) {
               $(frm).prepend(json.ErrorMessages);
               json.ErrorMessages = null;
            } else if (preview) {
               // Pop up the new preview.
               $.popup({}, json.Data);
            } else if (!draft) {
               if (json.RedirectUrl) {
                  $(frm).triggerHandler('complete');
                  // Redirect to the new discussion
                  document.location = json.RedirectUrl;
               } else {
                  $('#Content').html(json.Data);
               }
            }
            gdn.inform(json);
         },
         complete: function(XMLHttpRequest, textStatus) {
            gdn.enable(btn);
         }
      });
      $(frm).triggerHandler('submit');
      return false;
   }