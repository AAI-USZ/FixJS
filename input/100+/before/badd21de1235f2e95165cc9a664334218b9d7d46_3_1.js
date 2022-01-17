function hk_render(layout_type) {
    if (layout_type) {
      document.getElementById('kb-callbar-call-action').classList.add('hide');
      document.getElementById('kb-callbar-add-contact').classList.add('hide');
      document.getElementById('kb-delete').classList.add('hide');
      document.getElementById('kb-callbar-back-action').classList
        .remove('hide');
    }else {
      //Default layout
      document.getElementById('kb-callbar-call-action').classList
        .remove('hide');
      document.getElementById('kb-callbar-add-contact').classList
        .remove('hide');
      document.getElementById('kb-delete').classList.remove('hide');
      document.getElementById('kb-callbar-back-action').classList
        .add('hide');
    }

  }