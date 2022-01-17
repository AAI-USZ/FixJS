function(e){
                e.preventDefault();
                if($(this).parents(".s3d-dropdown-list").length || $(e.target).hasClass("s3d-dropdown-list-arrow-up")){
                    $(window).trigger("init.contentpermissions.sakai", {"newPermission": $(this).data("permissionvalue") || false});
                    $('#entity_contentsettings_dropdown').jqmHide();
                }
            }