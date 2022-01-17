function(up, params) {
        if ($('#' + settings.container + '-runtimeInfo').length > 0) $('#' + settings.container + '-runtimeInfo').text("Current runtime: " + params.runtime);
        // if ($container.find("dt").length > 0 && $container.find("dt").text() == "") $container.find("dt").text($container.attr('id'));
        
        $("a.remove").live('click', function() {
        
          var $attachment = $(this).parents('.attachment');
          var $attachmentUploader = $(this).parents('.attachmentUploader');
          
          $.get('/remove', {
            model: $container.data('model'),
            id: $container.data('id'),
            relation: $container.data('relation'),
            relation_id: $attachment.data('id'),
            embedded_in_model: $attachmentUploader.data('embedded-in-model'),
            embedded_in_id: $attachmentUploader.data('embedded-in-id')
          }, function(data) {
            $attachment.remove();
          });
        });

        $(".attachmentVideoUploader-" + $container.data('relation')).live('click', function() {
          var $attachment = $(this).parents('.attachment');
          var $attachmentUploader = $(this).parents('.attachmentUploader');

          $.get('/upload', {
            model: $container.data('model'),
            id: $container.data('id'),
            relation: $container.data('relation'),
            relation_id: $attachment.data('id'),
            embedded_in_model: $attachmentUploader.data('embedded-in-model'),
            embedded_in_id: $attachmentUploader.data('embedded-in-id'),
            partial: $container.data('partial') === undefined ? '' : $container.data('partial'),
            video: $(".attachmentVideoUploaderField").val()
          }, function(data) {
            $(".loadedAttachments").append(data);
          });
        });
      }