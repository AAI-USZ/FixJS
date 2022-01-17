function (i, group) {
                    var titleMatch = group["sakai:group-title"] && group["sakai:group-title"].toLowerCase().indexOf(currentQuery.toLowerCase()) >= 0;
                    var descriptionMatch = group["sakai:group-description"] && group["sakai:group-description"].toLowerCase().indexOf(currentQuery.toLowerCase()) >= 0;
                    var idMatch = group.groupid.toLowerCase().indexOf(currentQuery.toLowerCase()) >= 0;
                    if(titleMatch || descriptionMatch || idMatch){
                        var groupType = sakai.api.i18n.getValueForKey("OTHER");
                        if (group["sakai:category"]){
                            for (var c = 0; c < sakai.config.worldTemplates.length; c++) {
                                if (sakai.config.worldTemplates[c].id === group["sakai:category"]){
                                    groupType = sakai.api.i18n.getValueForKey(sakai.config.worldTemplates[c].title);
                                }
                            }
                        }

                        groupData.push({
                            id: group.groupid,
                            url: "/~" + sakai.api.Util.makeSafeURL(group.groupid),
                            picPath: group.picPath,
                            picPathLarge: group.picPathLarge,
                            edit_url: "/dev/group_edit2.html?id=" + group.groupid,
                            title: group["sakai:group-title"],
                            titleShort: group["sakai:group-title-short"],
                            titleShorter: group["sakai:group-title-shorter"],
                            descShort: group["sakai:group-description-short"],
                            descShorter: group["sakai:group-description-shorter"],
                            type: groupType,
                            lastModified: group.lastModified,
                            contentCount: group.counts.contentCount,
                            membersCount: group.counts.membersCount,
                            tags: group.tagsProcessed,
                            userMember: sakai.api.Groups.isCurrentUserAMember(group.groupid,sakai.data.me),
                            joinable: group["sakai:group-joinable"]
                        });
                    }
                }