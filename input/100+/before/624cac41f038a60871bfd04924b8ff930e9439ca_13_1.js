function(){
            if ($addpeopleContactsContainer.text() === "") {
                var groups = sakai.api.Groups.getMemberships(sakai.data.me.groups);
                groups = groups.entry;
                if (sakai_global.group && sakai_global.group.groupData && sakai_global.group.groupData["sakai:group-id"]) {
                    groups = _.reject(groups, function(group) {
                        return group["sakai:group-id"] === sakai_global.group.groupData["sakai:group-id"];
                    });
                }
                $addpeopleContactsContainer.html(sakai.api.Util.TemplateRenderer(addpeopleContactsTemplate, {
                    "contacts": sakai.data.me.mycontacts,
                    "groups": groups,
                    "sakai": sakai
                }));
            }
        }