function(isSakaiDoc){
            $("#content_profile_left_column").hide();
            $("#content_profile_main_container").removeClass("s3d-twocolumn");
            $("#content_profile_right_container").removeClass("s3d-page-column-right");
            $("#content_profile_right_container").addClass("s3d-page-fullcolumn-padding");
            $("#content_profile_right_metacomments").addClass("fl-container-650");
            $("#content_profile_right_metacomments").removeClass("fl-container-450");
            if (isSakaiDoc){
                $("#content_profile_preview_container").hide();
                $("#content_profile_sakaidoc_container").show();
            } else {
                $("#content_profile_preview_container").show();
                $("#content_profile_sakaidoc_container").hide();
            }
        }