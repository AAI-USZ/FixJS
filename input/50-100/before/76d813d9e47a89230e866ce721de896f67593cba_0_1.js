function() {
      console.log('ostensibly saving everything');
      editor.save_report('#report');
      $(".block").each(function(i) {
        console.log('block');
        p.editor.save_block(this);
      });
    }