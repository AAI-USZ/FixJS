function(i, group){
                if (group["sakai:group-id"]) {
                    group.id = group["sakai:group-id"];
                    if (group["sakai:group-title"]) {
                        group["sakai:group-title-short"] = sakai_util.applyThreeDots(group["sakai:group-title"], 550, {max_rows: 1,whole_word: false}, "s3d-bold");
                        group["sakai:group-title-shorter"] = sakai_util.applyThreeDots(group["sakai:group-title"], 130, {max_rows: 1,whole_word: false}, "s3d-bold");
                    }

                    if (group["sakai:group-description"]) {
                        group["sakai:group-description-short"] = sakai_util.applyThreeDots(group["sakai:group-description"], 580, {max_rows: 2,whole_word: false});
                        group["sakai:group-description-shorter"] = sakai_util.applyThreeDots(group["sakai:group-description"], 150, {max_rows: 2,whole_word: false});
                    }

                    var groupType = sakai_i18n.getValueForKey("OTHER");
                    if (group["sakai:category"]){
                        for (var c = 0; c < sakai_conf.worldTemplates.length; c++) {
                            if (sakai_conf.worldTemplates[c].id === group["sakai:category"]){
                                groupType = sakai_i18n.getValueForKey(sakai_conf.worldTemplates[c].title);
                            }
                        }
                    }
                    // Modify the tags if there are any
                    if (group["sakai:tags"]) {
                        group.tagsProcessed = sakai_util.formatTags(group["sakai:tags"]);
                    } else if (group.basic && group.basic.elements && group.basic.elements["sakai:tags"]) {
                        group.tagsProcessed = sakai_util.formatTags(group.basic.elements["sakai:tags"].value);
                    }
                    group.groupType = groupType;
                    group.lastModified = group.lastModified;
                    group.picPath = sakaiGroupsAPI.getProfilePicture(group);
                    group.userMember = false;
                    if (sakaiGroupsAPI.isCurrentUserAManager(group["sakai:group-id"], meData) || sakaiGroupsAPI.isCurrentUserAMember(group["sakai:group-id"], meData)){
                        group.userMember = true;
                    }
                    // use large default group icon on search page
                    if (group.picPath === sakai_conf.URL.GROUP_DEFAULT_ICON_URL){
                        group.picPathLarge = sakai_conf.URL.GROUP_DEFAULT_ICON_URL_LARGE;
                    }
                }
            }