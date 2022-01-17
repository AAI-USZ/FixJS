function(e) {
         e.preventDefault();
//         reset();
//         setup();
         $( "#label_output" ).hide();
         $('#http_error').remove();
         $('#mklabel').show();
         $(this).blur();
      }).resizable({ aspectRatio: true  }