function(){
            var idArr = [];
            var titleArr = [];
            $(".collectionviewer_check:checked:visible").each(function(i, item){
                idArr.push($(item).attr("data-entityid"));
                titleArr.push($(item).attr("data-entityname"));
            });
            $("#collections_savecontent_button").attr("data-entityid", idArr);
            $("#collections_savecontent_button").attr("data-entityname", titleArr);
        }