function get_current_source_id(){
  if(current_document != false){
    if($("#document_" + current_document).size()){
      var source_document_id = $("#document_" + current_document).attr("id").substring(9);
      if((k = source_document_id.indexOf("_")) != -1){
        return source_document_id.substring(0, k);
      }
    }
  }
  return false;
}