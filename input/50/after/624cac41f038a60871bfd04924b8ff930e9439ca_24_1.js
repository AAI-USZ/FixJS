function(e){
                e.preventDefault();
                $(document).trigger('init.uploadnewversion.sakai');
                $('#entity_contentsettings_dropdown').jqmHide();
            }