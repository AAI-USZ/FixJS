function() {
      var btn = this;
      var container = $(btn).parents('li.ItemComment');
      $(container).addClass('Editing');
      var parent = $(container).find('div.Comment');
      var msg = $(parent).find('div.Message');
      $(parent).find('div.Meta span:last').after('<span class="TinyProgress">&#160;</span>');
      if ($(msg).is(':visible')) {
         $.ajax({
            type: "GET",
            url: $(btn).attr('href'),
            data: 'DeliveryType=VIEW&DeliveryMethod=JSON',
            dataType: 'json',
            error: function(xhr) {
               gdn.informError(xhr);
            },
            success: function(json) {
               json = $.postParseJson(json);
               
               $(msg).after(json.Data);
               $(msg).hide();
               $(document).trigger('EditCommentFormLoaded', [container]);
            },
            complete: function() {
               $(parent).find('span.TinyProgress').remove();
               $(btn).closest('.Flyout').hide().closest('.ToggleFlyout').removeClass('Open');
            }
         });
      } else {
         $(parent).find('div.EditCommentForm').remove();
         $(parent).find('span.TinyProgress').remove();
         $(msg).show();
      }
      
      $(document).trigger('CommentEditingComplete', [msg]);
      return false;
   }