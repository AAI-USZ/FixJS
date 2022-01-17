function(options) {
                existingGroup = options.editingGroup;
                if (!widgetData && options.editingGroup) {
                    widgetData = {
                        'category': sakai_global.group.groupData['sakai:category'],
                        'id': sakai_global.group.groupData['sakai:templateid']
                    };
                }
                loadRoles();
                addBinding();
                var autoSuggestOpts = {
                    "asHtmlID": tuid,
                    "resultClick":createAutoSuggestedUser,
                    searchObjProps: "name,value"
                };
                sakai.api.Util.AutoSuggest.setup($addpeopleMembersAutoSuggestField, autoSuggestOpts, function() {
                    $addpeopleMembersAutoSuggest.show();
                });
                initializeJQM();
                renderSelectedContacts();
                if(sakai_global.group){
                    fetchMembers();
                }
                if(existingGroup){
                    $addpeopleNewGroup.hide();
                    $addpeopleExistingGroup.show();
                }
                if(options.openDialog) {
                    showDialog();
                    renderContacts();
                }
        }