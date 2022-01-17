function(success, groupData, nameTaken){
            if (success) {
                if($.bbq.getState("contentToAdd")){
                    setDefaultContent(groupid);
                } else {
                    window.location = "/~" + groupid;
                }
            } else {
                var errorMessage = sakai.api.i18n.getValueForKey("GROUP_NOT_SUCCESSFULLY_CREATED", "newcreategroup").replace(/\$\{title\}/, grouptitle);
                if (groupData.errorMessage) {
                    errorMessage = errorMessage + sakai.api.i18n.getValueForKey(groupData.errorMessage, "newcreategroup");
                }
                $newcreategroupContainer.find("select, input, textarea:not([class*='as-input']), button").removeAttr("disabled");
                sakai.api.Util.progressIndicator.hideProgressIndicator();
                sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey("AN_ERROR_OCCURRED", "newcreategroup"),
                    errorMessage,
                    sakai.api.Util.notification.type.ERROR);
            }
        }