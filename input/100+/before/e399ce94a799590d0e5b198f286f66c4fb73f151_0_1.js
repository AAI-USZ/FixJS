function(options) {
                existingGroup = options.editingGroup;
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