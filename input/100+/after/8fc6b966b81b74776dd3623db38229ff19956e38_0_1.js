function() {
        if ( $(this).children('li').length ) {
          var elm = $(this);
          elm.show();
          elm.sortable({
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
          elm.children('li').disableSelection();
          elm.find('.option-tree-setting-body').bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
            e.stopImmediatePropagation();
          });
        }
      }