function(e){
       if ( !$('#terms_of_service').is(':checked') ){
           $('#main_upload_start').attr('disabled', true);
        $("#upload_tooltip").show();
        $("#upload_tooltip").css({
            top: (e.clientY+5)+ "px",
            left: (e.clientX+5) + "px"
        });
       } else {
         if (filestoupload > 0) $('#main_upload_start').attr('disabled', false);
         $("#upload_tooltip").hide();
       }
    }