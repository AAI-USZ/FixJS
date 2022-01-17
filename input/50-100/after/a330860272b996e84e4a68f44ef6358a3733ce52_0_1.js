function(){

                     if($(this).attr("value") == $id){
                         $(this).css("display", "none");
                         if($(this).attr("selected")){
                             $(this).siblings().attr("selected", "selected");
                             $(this).removeAttr("selected");
                         }
                     }
                }