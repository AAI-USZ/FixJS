function doFocus(id) {
      if(!$("#" + id).editorBox('focus')) {
        setTimeout(function(){
          doFocus(id);
        }, 500);
      }
    }