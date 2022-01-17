function(data) {
            if (sakai_global.content_profile) {
                contentData = data || sakai_global.content_profile.content_data;
                if (contentData) {
                    doInit();
                }
            }
        }