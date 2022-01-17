function(){
                $(this).hide();
                $("#collectionviewer_edit_collection_button", $rootel).show();
                $.bbq.pushState({"ls":"carousel"});
            }