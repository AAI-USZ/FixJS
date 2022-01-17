function play_next_source(){
  var FOUND = false;
  if(current_document != false){
    if($("#document_" + current_document).size()){
      var current_source_document_id = $("#document_" + current_document).attr("id");
      var current_source_id = get_current_source_id();
      if(current_source_id != false){
        var CURRENT_FOUND = false;
        $(".track:not(.track .track)").each(
          function(){
            if(!FOUND){
              if(CURRENT_FOUND){
                $(this).find(".documents li").each(
                  function(){
                    if(!FOUND){
                      var source_document_id = $(this).attr("id").substring(9);
                      if(source_document_id.length > 0){
                        if($("#player_" + source_document_id).size()){
                          FOUND = true;
                          play(source_document_id);
                        }
                      }
                    }
                  }
                );
              }
              else{
                if(current_source_id == $(this).attr("id").substring("6")){
                  CURRENT_FOUND = true;
                }
              }
            }
          }
        );
      }
    }
  }
  return FOUND;
}