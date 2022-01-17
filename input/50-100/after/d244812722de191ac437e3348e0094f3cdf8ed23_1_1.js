function(){
      console.log($(this))
      console.log($(this).parents('#cms_dialog'))
      ui_control = $(this).parents('#cms_dialog').data('ui_control')
      if (ui_control) {
        ui_control.img_src = $(this).data('url');
        ui_control.set();
        $(this).parents('#cms_dialog').data('ui_control', null)
      }
      return false;
    }