function(){
            versions = [];
            if (!sakai_global.content_profile || sakai_global.content_profile.content_data.data.mimeType != "x-sakai/document") {
                $("#content_profile_preview_versions_container").show();
            }else {
                $("#content_profile_preview_versions_container").remove();
            }
            addBinding();
            getContext();
            getVersions();
        }