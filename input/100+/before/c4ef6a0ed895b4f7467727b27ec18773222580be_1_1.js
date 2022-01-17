function(e){
        
        //Method of Action specific to detect when the iframe has focus
        if (top != self && !e.isTrigger) {
            if(typeof top.exports.setEditorFocus == 'function') {
              top.exports.setEditorFocus();
            }
        }
          if (!$(e.target).hasClass("menu_title") && $('#menu_bar').hasClass("active")) {
            if(!$(e.target).hasClass("disabled") && $(e.target).hasClass("menu_item")) {
              blinker(e);
              return;
            }
            $('#menu_bar').removeClass('active')
            $('.tools_flyout').hide();
            $('input').blur(); 
          }
      }