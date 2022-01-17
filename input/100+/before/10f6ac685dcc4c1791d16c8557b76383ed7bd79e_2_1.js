function(){
            if (sakai_global.content_profile.content_data) {
                var context = "content";
                if (sakai.data.me.user.anon) {
                    type = "content_anon";
                } else if (sakai_global.content_profile.content_data.isManager) {
                    type = "content_managed";
                } else if (sakai_global.content_profile.content_data.isViewer) {
                    type = "content_shared";
                } else {
                    type = "content_not_shared";
                }
                $(window).trigger("sakai.entity.init", [context, type, sakai_global.content_profile.content_data]);
            }
        }