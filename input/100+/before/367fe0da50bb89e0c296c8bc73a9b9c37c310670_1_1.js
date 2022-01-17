function(success, groupData, nameTaken){
            if (success) {
                if($.bbq.getState("contentToAdd")){
                    setDefaultContent(groupid);
                } else {
                    window.location = "/~" + groupid;
                }
            } else {
                $newcreategroupContainer.find("select, input, textarea:not([class*='as-input']), button").removeAttr("disabled");
                sakai.api.Util.progressIndicator.hideProgressIndicator();
                sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey("AN_ERROR_OCCURRED", "newcreategroup"),
                    sakai.api.i18n.getValueForKey("GROUP_NOT_SUCCESSFULLY_CREATED", "newcreategroup").replace(/\$\{title\}/, grouptitle),
                    sakai.api.Util.notification.type.ERROR);
            }
        }