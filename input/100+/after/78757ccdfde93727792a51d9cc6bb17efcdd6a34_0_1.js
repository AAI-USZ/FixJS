function() {
      var btn = this;
      var parent = $(btn).parents('div.CommentForm, div.EditCommentForm');
      var frm = $(parent).find('form');
      var textbox = $(frm).find('textarea');
      var inpCommentID = $(frm).find('input:hidden[name$=CommentID]');
      var inpDraftID = $(frm).find('input:hidden[name$=DraftID]');
      var type = 'Post';
      var preview = $(btn).hasClass('PreviewButton');
      if (preview) {
         type = 'Preview';
         // If there is already a preview showing, kill processing.
         if ($('div.Preview').length > 0 || jQuery.trim($(textbox).val()) == '')
            return false;
      }
      var draft = $(btn).hasClass('DraftButton');
      if (draft) {
         type = 'Draft';
         // Don't save draft if string is empty
         if (jQuery.trim($(textbox).val()) == '')
            return false;
         
         if (draftSaving > 0)
            return false;
         
//         console.log('Saving draft: '+(new Date()).toUTCString());
         draftSaving++;
      }

      // Post the form, and append the results to #Discussion, and erase the textbox
      var postValues = $(frm).serialize();
      postValues += '&DeliveryType=VIEW&DeliveryMethod=JSON'; // DELIVERY_TYPE_VIEW
      postValues += '&Type='+type;
      var discussionID = $(frm).find('[name$=DiscussionID]');
      discussionID = discussionID.length > 0 ? discussionID.val() : 0;
      var tKey = $(frm).find('[name$=TransientKey]');
      var prefix = tKey.attr('name').replace('TransientKey', '');
      // Get the last comment id on the page
      var comments = $('ul.Comments li.ItemComment');
      var lastComment = $(comments).get(comments.length-1);
      var lastCommentID = $(lastComment).attr('id');
      if (lastCommentID)
         lastCommentID = lastCommentID.indexOf('Discussion_') == 0 ? 0 : lastCommentID.replace('Comment_', '');
      else
         lastCommentID = 0;
         
      postValues += '&' + prefix + 'LastCommentID=' + lastCommentID;
      var action = $(frm).attr('action');
      if (action.indexOf('?') >= 0)
         action = action.substr(0, action.indexOf('?'));
      if (discussionID > 0) {
         if (action.substr(-1,1) != '/')
            action += '/';
         
         action += discussionID;
      }
      
      $(frm).find(':submit').attr('disabled', 'disabled');
      $(parent).find('a.Back').after('<span class="TinyProgress">&#160;</span>');
      // Also add a spinner for comments being edited
      // $(btn).parents('div.Comment').find('div.Meta span:last').after('<span class="TinyProgress">&#160;</span>');
      $(frm).triggerHandler('BeforeSubmit', [frm, btn]);
      if (type != 'Draft')
         $(':submit', frm).addClass('InProgress');
      else
         $('.DraftButton', frm).addClass('InProgress');
      $.ajax({
         type: "POST",
         url: action,
         data: postValues,
         dataType: 'json',
         error: function(xhr) {
            gdn.informError(xhr, draft);
         },
         success: function(json) {
            json = $.postParseJson(json);
            
            var processedTargets = false;
            // If there are targets, process them
            if (json.Targets && json.Targets.length > 0) {
               for(i = 0; i < json.Targets.length; i++) {
                  if (json.Targets[i].Type != "Ajax") {
                     json.Targets[i].Data = json.Data;
                     processedTargets = true;
                     break;
                   }
               }
               gdn.processTargets(json.Targets);
            }

            // If there is a redirect url, go to it
            if (json.RedirectUrl != null && jQuery.trim(json.RedirectUrl) != '') {
               resetCommentForm(btn);
               clearCommentForm(btn);
               window.location.replace(json.RedirectUrl);
               return false;
            }

            // Remove any old popups if not saving as a draft
            if (!draft && json.FormSaved == true)
               $('div.Popup,.Overlay').remove();

            var commentID = json.CommentID;
            
            // Assign the comment id to the form if it was defined
            if (commentID != null && commentID != '') {
               $(inpCommentID).val(commentID);
            }

            if (json.DraftID != null && json.DraftID != '')
               $(inpDraftID).val(json.DraftID);
               
            if (json.MyDrafts != null) {
               if (json.CountDrafts != null && json.CountDrafts > 0)
                  json.MyDrafts += '<span>'+json.CountDrafts+'</span>';
                  
               $('ul#Menu li.MyDrafts a').html(json.MyDrafts);
            }

            // Remove any old errors from the form
            $(frm).find('div.Errors').remove();
            if (json.FormSaved == false) {
               $(frm).prepend(json.ErrorMessages);
               json.ErrorMessages = null;
            } else if (preview) {
               // Reveal the "Edit" button and hide this one
               $(btn).hide();
               $(parent).find('.WriteButton').show();

               $(frm).trigger('PreviewLoaded', [frm]);
               $(frm).find('.TextBoxWrapper').hide().after(json.Data);
               
            } else if (!draft) {
               // Clean up the form
               if (processedTargets)
                  btn = $('div.CommentForm :submit, div.EditCommentForm :submit');

               resetCommentForm(btn);
               clearCommentForm(btn);

               // If editing an existing comment, replace the appropriate row
               var existingCommentRow = $('#Comment_' + commentID);
               if (processedTargets) {
                  // Don't do anything with the data b/c it's already been handled by processTargets
               } else if (existingCommentRow.length > 0) {
                  existingCommentRow.after(json.Data).remove();
                  $('#Comment_' + commentID).effect("highlight", {}, "slow");
               } else {
                  gdn.definition('LastCommentID', commentID, true);
                  // If adding a new comment, show all new comments since the page last loaded, including the new one.
                  if (gdn.definition('PrependNewComments') == '1') {
                     $(json.Data).prependTo('ul.Comments');
                     $('ul.Comments li:first').effect("highlight", {}, "slow");
                  } else {
                     $(json.Data).appendTo('ul.Comments');
                     $('ul.Comments li:last').effect("highlight", {}, "slow");
                  }
               }
               // Remove any "More" pager links (because it is typically replaced with the latest comment by this function)
               if (gdn.definition('PrependNewComments') != '1') // If prepending the latest comment, don't remove the pager.
                  $('#PagerMore').remove();
               
               // Set the discussionid on the form in case the discussion was created by adding the last comment
               var discussionID = $(frm).find('[name$=DiscussionID]');
               if (discussionID.length == 0 && json.DiscussionID) {
                  $(frm).append('<input type="hidden" name="'+prefix+'DiscussionID" value="'+json.DiscussionID+'">');
               }

               // Let listeners know that the comment was added.
               $(document).trigger('CommentAdded');
               $(frm).triggerHandler('complete');
            }
            gdn.inform(json);
            return false;
         },
         complete: function(XMLHttpRequest, textStatus) {
            // Remove any spinners, and re-enable buttons.
            $(':submit', frm).removeClass('InProgress');
            $('.DraftButton', frm).removeClass('InProgress');
            $(frm).find(':submit').removeAttr("disabled");
            if (draft)
               draftSaving--;
         }
      });
      frm.triggerHandler('submit');
      return false;
   }