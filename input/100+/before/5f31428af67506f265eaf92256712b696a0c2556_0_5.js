function select_list() {
    var project='DEFAULT';
    if ($('#list_name :selected').val()) {
      project=$('#list_name :selected').val();
    }
    
    $('#current').empty();
    $.get(url+'/feed/'+project, function(y) {
      $.each(y, function(ii, p){
         add_select_list(p);
      });
      if(project!='DEFAULT'){
         
      }
      $('#current').selectable().selectable( "refresh" );
    }, "json");
   }