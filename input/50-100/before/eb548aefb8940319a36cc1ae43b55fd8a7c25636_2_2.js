function(e){
            e.preventDefault();
            $('.tooltip').hide();
            $('span[data-id=' + $(this).data('id') + '].tooltip').show();
            targets.attr('title', "");
          }