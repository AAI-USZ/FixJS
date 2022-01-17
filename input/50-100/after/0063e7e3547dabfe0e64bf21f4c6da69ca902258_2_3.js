function(){
            if ($('.collectionviewer_check:checked:visible', $rootel).length) {
                $('#collections_remove_button', $rootel).removeAttr('disabled');
                $('#collections_savecontent_button', $rootel).removeAttr('disabled');
            } else {
                $('#collections_remove_button', $rootel).attr('disabled', true);
                $('#collections_savecontent_button', $rootel).attr('disabled', true);
                $('#collectionviewer_select_all', $rootel).removeAttr('checked');
            }
            updateButtonData();
        }