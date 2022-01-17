function(){
        // enable the button - we either succeeded or failed, but the user
        // will need the button again either way
        $('#confabulation').children(':submit')
          .val('Confabulate')
          .removeAttr('disabled');
      }