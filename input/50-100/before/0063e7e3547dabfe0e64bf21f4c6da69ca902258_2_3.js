function(){
            if($(".collectionviewer_check:checked:visible").length){
                $("#collections_remove_button").removeAttr("disabled");
                $("#collections_savecontent_button").removeAttr("disabled");
            } else {
                $("#collections_remove_button").attr("disabled", true);
                $("#collections_savecontent_button").attr("disabled", true);
                $("#collectionviewer_select_all").removeAttr("checked");
            }
            updateButtonData();
        }