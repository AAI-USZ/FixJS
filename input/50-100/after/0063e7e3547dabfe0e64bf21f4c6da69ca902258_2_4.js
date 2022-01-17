function(){
            var idArr = [];
            var titleArr = [];
            $('.collectionviewer_check:checked:visible', $rootel).each(function(i, item) {
                idArr.push($(item).attr("data-entityid"));
                titleArr.push($(item).attr("data-entityname"));
            });
            $('#collections_savecontent_button', $rootel).attr('data-entityid', idArr);
            $('#collections_savecontent_button', $rootel).attr('data-entityname', titleArr);
        }