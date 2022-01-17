function(){
                if($(this).is(":checked")){
                    $(".collectionviewer_check:visible").attr("checked", true);
                } else{
                    $(".collectionviewer_check:visible").removeAttr("checked");
                }
                checkEditingEnabled();
            }