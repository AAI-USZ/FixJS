function() {
      editor.save_report('#report');
      $(".block").each(function(i) {
        p.editor.save_block(this);
      });
    }