function(){
            $(contentpermissionsSelectable).live("click", function(){
                $("#contentpermissions_see_container .s3d-outer-shadow-container").addClass("contentpermissions_unselected_rbt");
                $(contentpermissionsSelectable).parent().removeClass("s3d-outer-shadow-container");
                $(this).parent().addClass("s3d-outer-shadow-container");
                $(this).parent().removeClass("contentpermissions_unselected_rbt");
            });

            $(".contentpermissions_permissions_container .s3d-actions-delete").live("click", doDelete);
            $("#contentpermissions_apply_permissions").live("click", showWarning);
            $("#contentpermissions_members_autosuggest_sharebutton").live("click", doShare);
            $(document).on('click', '#contentpermissions_members_autosuggest_cancelbutton', hideShare);
        }