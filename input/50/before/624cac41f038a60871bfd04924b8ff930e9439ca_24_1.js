function(e){
                e.preventDefault();
                $(window).trigger("init.uploadnewversion.sakai");
                $('#entity_contentsettings_dropdown').jqmHide();
            }