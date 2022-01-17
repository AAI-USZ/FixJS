function() {
            $('span[data-id=' + $(this).data('id') + '].tooltip').show();
            targets.attr('title', "");
          }