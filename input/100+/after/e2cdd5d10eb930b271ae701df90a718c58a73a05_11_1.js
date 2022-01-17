function(index, user){
                        var groupTitle = sakai.api.Security.safeOutput(sakai_global.group.groupData["sakai:group-title"]);
                        var groupID = sakai_global.group.groupData["sakai:group-id"];
                        var displayName = sakai.api.User.getDisplayName(sakai.data.me.profile);
                        var subject = sakai.api.i18n.getValueForKey("USER_HAS_ADDED_YOU_AS_A_ROLE_TO_THE_EXISTING_GROUP_GROUPNAME", "addpeople").replace("${user}", displayName).replace("${role}", user.permissionTitle).replace("${groupName}", groupTitle);
                        var body = $("#addpeople_message_template", $rootel).text().replace("${role}", user.permissionTitle).replace("${firstname}", user.name).replace("${user}", sakai.api.User.getDisplayName(sakai.data.me.profile)).replace("${groupURL}", sakai.config.SakaiDomain + "/~" + groupID).replace("${groupName}", groupTitle);
                        sakai.api.Communication.sendMessage(user.userid, sakai.data.me, subject, body, "message", false, false, true, "group_invitation");
                    }