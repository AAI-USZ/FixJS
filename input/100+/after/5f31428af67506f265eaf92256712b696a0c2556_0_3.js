function select_list() {
      var project='DEFAULT';
      if ($('#list_name :selected').val()) {
         project=$('#list_name :selected').val();
      }
      $('#current').empty();
      $.ajax({
         url: url+'/feed/'+project,
         type: 'GET',
         processData: false,
         dataType: 'json',
         success: function(y) {
            $.each(y, function(ii, p){
               add_select_list(p);
            });
            if(project!='DEFAULT'){
         
            }
            $('#current').selectable({filter: "li"}).selectable( "refresh" );
            $('#http_error').remove();
         },
         statusCode: error
      });
   }