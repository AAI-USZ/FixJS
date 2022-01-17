function (groups) {
            if (!groups.entry.length) {
                $mymemberships_items.hide();
                sakai.api.Util.TemplateRenderer("mymemberships_nogroups_template", {isMe: mymemberships.isOwnerViewing}, $mymemberships_nogroups);
                $mymemberships_nogroups.show();
                $(".s3d-page-header-top-row", $rootel).hide();
                $(".s3d-page-header-bottom-row", $rootel).hide();
                return;
            } else {
                if(sakai.data.me.user.anon){
                    $(".s3d-page-header-bottom-row", $rootel).hide();
                } else {
                    $(".s3d-page-header-top-row", $rootel).show();
                    $(".s3d-page-header-bottom-row", $rootel).show();
                }
                if(mymemberships.sortOrder === "modified"){
                    groups.entry = groups.entry.sort(groupSortModified);
                    groups.entry.reverse();
                } else {
                    groups.entry = groups.entry.sort(groupSortName);
                    if(mymemberships.sortOrder === "desc"){
                        groups.entry.reverse();
                    }
                }
                var groupData = [];
                var tempGroupData = sakai.api.Groups.prepareGroupsForRender(groups.entry, sakai.data.me);
                $.each(tempGroupData, function (i, group) {
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
                });
                var json = {
                    groups: groupData,
                    isOwnerViewing: mymemberships.isOwnerViewing,
                    user_manages: function (group) {
                        if (!group) { return false; }
                        return sakai.api.Groups.isCurrentUserAManager(group.id, sakai.data.me);
                    },
                    sakai: sakai
                };
                $mymemberships_nodata.hide();
                $mymemberships_nogroups.hide();
                // Show message that no search results where returned.
                if(!json.groups.length){
                    $mymemberships_nosearchresults.show();
                    $mymemberships_items.hide();
                } else {
                    $mymemberships_nosearchresults.hide();
                    $mymemberships_items.show();
                    $("#mymemberships_sortarea", $rootel).show();
                    $("#mymemberships_items", $rootel).html(sakai.api.Util.TemplateRenderer(
                        $("#mymemberships_items_template", $rootel), json));
                }

                // display search results count
                if (currentQuery && groupData.length) {
                    $mymemberships_result_count.show();
                    var resultLabel = sakai.api.i18n.getValueForKey('RESULTS');
                    if (groupData.length === 1) {
                        resultLabel = sakai.api.i18n.getValueForKey('RESULT');
                    }
                    $mymemberships_result_count.children('.s3d-search-result-count-label').text(resultLabel);
                    $mymemberships_result_count.children('.s3d-search-result-count-count').text(groupData.length);
                } else {
                    $mymemberships_result_count.hide();
                }

                // display functions available to logged in users
                if (!sakai.data.me.user.anon) {
                    $(".mymemberships_item_anonuser").hide();
                    $(".mymemberships_item_user_functions").show();
                }

                if (mymemberships.isOwnerViewing) {
                    // disable remove membership button if not allowed to leave
                    var groupsToCheck = [];
                    $.each(groups.entry, function(i, group){
                        groupsToCheck.push(group.groupid);
                    });
                    sakai.api.Groups.isAllowedToLeave(groupsToCheck, sakai.data.me, function(leaveAllowed){
                        $.each(leaveAllowed, function(groupid, canLeave){
                            if (!canLeave) {
                                $(".mymemberships_leave[data-sakai-entityid='" + groupid + "']").addClass("mymemberhips_disabled_leave");
                            }
                        });
                    });
                }
            }
        }