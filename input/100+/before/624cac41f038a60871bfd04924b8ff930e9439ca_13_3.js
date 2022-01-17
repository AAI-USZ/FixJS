function(e, initTuid, editingGroup){
            if (initTuid + "addpeople" === tuid || sakai_global.group) {
                existingGroup = editingGroup;
                if (!hasbeenInit) {
                    if (!widgetData) {
                        widgetData = {
                            "category": sakai_global.group.groupData["sakai:category"],
                            "id": sakai_global.group.groupData["sakai:templateid"]
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
                    hasbeenInit = true;
                } else {
                    renderSelectedContacts();
                }
                if(sakai_global.group){
                    fetchMembers();
                }
                if(existingGroup){
                    $addpeopleNewGroup.hide();
                    $addpeopleExistingGroup.show();
                }
                showDialog();
                sakai.api.User.getContacts(renderContacts);
            }
        }