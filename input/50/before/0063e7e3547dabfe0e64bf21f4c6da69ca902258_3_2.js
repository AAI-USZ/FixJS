function(ev, data){
                contentData = data || sakai_global.content_profile.content_data;
                if (contentData) {
                    doInit();
                }
            }