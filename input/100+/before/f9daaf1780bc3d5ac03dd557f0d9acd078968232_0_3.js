function play_source_from(id_source, position){
  if(
       (current_document != false)
    && (current_source_id = get_current_source_id())
    && (id_source == current_source_id)
  ){
    _play(0 + position);
  }
  else{
    stop();
    var FOUND = false;
    $("#track_" + id_source + " .documents li").each(
      function(){
        if(!FOUND){
          var source_document_id = $(this).attr("id").substring(9);
          if(source_document_id.length > 0){
            if($("#player_" + source_document_id).size()){
              FOUND = true;
              current_document = source_document_id;
              setTimeout("_play(" + position + ")", 1000);
            }
          }
        }
      }
    );
  }
  gui_state("playing");
}