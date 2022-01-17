function() {
          var $attachment = $(this).parents('.attachment');
          var $attachmentUploader = $(this).parents('.attachmentUploader');
          var $videoField = $("#attachmentVideoUploaderField" + modelAndRelation);

          $.get('/upload', {
            model: $container.data('model'),
            id: $container.data('id'),
            relation: $container.data('relation'),
            relation_id: $attachment.data('id'),
            embedded_in_model: $attachmentUploader.data('embedded-in-model'),
            embedded_in_id: $attachmentUploader.data('embedded-in-id'),
            partial: $container.data('partial') === undefined ? '' : $container.data('partial'),
            video: $videoField.val()
          }, function(data) {
            $("#" + $container.attr("id") + "-loadedAttachments").append(data);
            $videoField.val("");
          });
        }