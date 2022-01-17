function() {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          }