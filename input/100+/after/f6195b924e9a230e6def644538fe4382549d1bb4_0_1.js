function(){
            groupId = sakai.api.Util.extractEntity(window.location.pathname);

            sakai.api.Groups.getGroupInformation({
                    groupId: groupId
                }, function(success, data) {
                    if (success) {
                        groupData = data;
                        sakai_global.group.groupData = groupData.authprofile;
                        sakai_global.group.groupId = groupId;
                        sakai.api.Security.showPage(function() {
                            if (groupData.authprofile['sakai:customStyle']) {
                                sakai.api.Util.include.css(groupData.authprofile['sakai:customStyle']);
                            }
                        });
                        defaultPageTitle = document.title;
                        document.title = document.title + ' ' + groupData.authprofile['sakai:group-title'];
                        loadGroupEntityWidget();
                        loadDocStructure();
                    } else {
                        sakai.api.Security.send404();
                    }
            });
        }