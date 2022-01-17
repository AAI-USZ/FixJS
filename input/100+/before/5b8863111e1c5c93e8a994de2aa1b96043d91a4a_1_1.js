function(success, data) {
                if (success){
                    groupData = {};
                    groupData.authprofile = data.properties;
                    groupData.authprofile.picture = sakai.api.Groups.getProfilePicture(groupData.authprofile);
                    sakai_global.group.groupData = groupData.authprofile;
                    sakai_global.group.groupId = groupId;
                    sakai.api.Security.showPage(function() {
                        if (groupData.authprofile["sakai:customStyle"]) {
                            sakai.api.Util.include.css(groupData.authprofile["sakai:customStyle"]);
                        }
                    });
                    defaultPageTitle = document.title;
                    document.title = document.title + " " + groupData.authprofile["sakai:group-title"];
                    loadGroupEntityWidget();
                    loadDocStructure();

                } else {
                    if (data.status === 401 || data.status === 403){
                        sakai.api.Security.send403();
                    } else {
                        sakai.api.Security.send404();
                    }
                }
            }