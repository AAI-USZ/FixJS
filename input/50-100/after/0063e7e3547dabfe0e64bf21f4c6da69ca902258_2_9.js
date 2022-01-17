function(){
                $(this).hide();
                $("#collectionviewer_edit_collection_button", $rootel).show();
                var state = {};
                state[collectionviewer.tuidls] = 'carousel';
                $.bbq.pushState(state);
                handleHashChange();
            }