function get_autocomplete_opts(field)
  {
    var autocomplete_opts = { 
      minLength: 2,
      source: function( request, response ) { 
        $.getJSON( "/authorities/generic_files/" + field, {
          q: request.term 
        }, response );
      },  
      focus: function() {
        // prevent value inserted on focus
        return false;
      }/* 
      select: function( event, ui ) {
        $("#selectedSubjects").append("<div class = 'selectedsubject'>" + ui.item.label+"<img id='killSubject' style='position:relative; left:10px' src='images/close_icon.gif'/><div id='hiddenId' style='display:none'>"+ui.item.value+"</div></div>");                
        $(this).val("");
        return false;
      }*/
    }   
    return autocomplete_opts;
  }