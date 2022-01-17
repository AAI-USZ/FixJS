function(){
            if (sakai_global.content_profile && sakai_global.content_profile.content_data){
                return sakai_global.content_profile.content_data.data["sakai:pooled-content-file-name"];
            }
            return collectionviewer.contextName;
        }