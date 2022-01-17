function() {
        if ( $(this).children('li').length ) {
          var elm = $(this);
          elm.show();
          $(this).sortable({
            items: 'li:not(.ui-state-disabled)',
            placeholder: 'ui-state-highlight',
            stop: function(evt, ui) {
              setTimeout(
                function(){
                  OT_UI.update_ids(elm);
                },
                200
              )
            }
          });
          $(this).children('li').disableSelection();	
        }
      }