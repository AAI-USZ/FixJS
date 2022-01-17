function(index, el) {
          var val = $(el).val();
          var reg = /^[A-Fa-f0-9]{6}$/;
          if( reg.test(val) && val != '' ) { 
            $(el).attr('value', '#'+val)
          } else if ( val == '' ) {
            $(this).next('.cp_box').css({'background':'#f1f1f1','border-color':'#ccc'});
          }
        }