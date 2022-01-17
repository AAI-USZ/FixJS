function() {
      $('.wp-editor-area').focus( function(){
        $(this).parent('div').css({borderColor:'#bbb'});
      }).blur( function(){
        $(this).parent('div').css({borderColor:'#ccc'});
      });
    }