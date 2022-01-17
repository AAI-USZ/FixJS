function(e){
        
        //Method of Action specific to detect when the iframe has focus
        if (top != self && !e.isTrigger) {
            if(typeof top.exports.setEditorFocus == 'function') {
              top.exports.setEditorFocus();
            }
        }
          if (!$(e.target).hasClass("menu_title")) {
            if(!$(e.target).hasClass("disabled") && $(e.target).hasClass("menu_item")) {
              blinker(e);
              return;
            }
            if ($("#tools_shapelib").is(":visible") && !$(e.target).parents("#tools_shapelib_show, #tools_shapelib").length)
              $("#tools_shapelib").hide()
            if (e.target.nodeName.toLowerCase() != "input") $("input").blur();
          }
      }