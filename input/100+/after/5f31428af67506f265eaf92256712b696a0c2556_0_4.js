function setup() {
      $('#img').dblclick(function(e) {
         e.preventDefault();
//         reset();
//         setup();
         $( "#label_output" ).hide();
         $('#http_error').remove();
         $('#mklabel').show();
         $(this).blur();
      }).resizable({ aspectRatio: true  });
      $('#img_label .ui-wrapper').draggable({ cursor: "move", containment: '#img_label' }).height($('#img').height()).width($('#img').width());
   }