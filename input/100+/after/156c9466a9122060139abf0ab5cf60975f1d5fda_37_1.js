function() {
        sakai.api.Util.progressIndicator.showProgressIndicator(
            sakai.api.i18n.getValueForKey('CREATING_YOUR_GROUP', 'newcreategroup').replace(/\$\{type\}/, sakai.api.i18n.getValueForKey(currentTemplate.title)),
            sakai.api.i18n.getValueForKey('PROCESSING_GROUP', 'newcreategroup')
        );
        var grouptitle = $newcreategroupGroupTitle.val() || "";
        var groupdescription = $newcreategroupGroupDescription.val() || "";
        var groupid = sakai.api.Util.makeSafeURL($newcreategroupSuggestedURL.val(), "-");
        var grouptags = sakai.api.Util.AutoSuggest.getTagsAndCategories( $newcreategroupGroupTags, true );
        var users = createUsersToAddObject();
        var subject = sakai.api.i18n.getValueForKey("USER_HAS_ADDED_YOU_AS_A_ROLE_TO_THE_GROUP_GROUPNAME", "newcreategroup").replace("<\"Role\">", "${role}");
        var body = $.trim($newcreategroup_members_message_template_unprocessed.text().replace("<\"Role\">", "${role}").replace("<\"First Name\">", "${firstName}"));
        var joinable = $newcreategroupGroupMembership.val();
        var visible = $newcreategroupCanBeFoundIn.val();
        sakai.api.Groups.createGroup(groupid, grouptitle, groupdescription, grouptags, users, joinable, visible, templatePath, subject, body, sakai.data.me, function(success, groupData, nameTaken){
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
        });
    }