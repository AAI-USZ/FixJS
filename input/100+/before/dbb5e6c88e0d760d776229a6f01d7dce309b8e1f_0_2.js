function play_first_source(){
  var FOUND = false;
  $(".track:not(.track .track)").each(
    function(){
      if(!FOUND){
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
    }
  );
  return FOUND;
}