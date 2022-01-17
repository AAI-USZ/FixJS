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