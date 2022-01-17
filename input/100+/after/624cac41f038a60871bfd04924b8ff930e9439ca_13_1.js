function(){
            if ($addpeopleContactsContainer.text() === "") {
                var groups = sakai.api.Groups.getMemberships(sakai.data.me.groups);
                groups = groups.entry;
                if (sakai_global.group && sakai_global.group.groupData && sakai_global.group.groupData["sakai:group-id"]) {
                    groups = _.reject(groups, function(group) {
                        return group["sakai:group-id"] === sakai_global.group.groupData["sakai:group-id"];
                    });
                }

                var url = sakai.config.URL.CONTACTS_FIND_STATE;
                var data = {
                    'state': 'ACCEPTED',
                    'items': '10'
                };

                // Disable the previous infinite scroll
                if (contactsInfinityScroll) {
                    contactsInfinityScroll.kill();
                }

                // Set up the infinite scroll for the list of contacts
                contactsInfinityScroll = $addpeopleContactsContainer.infinitescroll(url, data, function(items, total) {
                    $.each(items, function(index, contact) {
                        contact.profile.basic.elements.picture = sakai.api.Util.constructProfilePicture(contact.profile);
                    });
                    if ((!groups || (groups && !groups.length)) && !total) {
                        $addpeopleNoContactsNoMemberships.show();
                    }
                    return sakai.api.Util.TemplateRenderer(addpeopleContactsTemplate, {
                        'contacts': items,
                        'groups': groups,
                        'renderGroups': renderGroups,
                        'sakai': sakai
                    });
                }, false, sakai.config.URL.INFINITE_LOADING_ICON, false, function() {
                    renderGroups = false;
                }, false, false, $addpeopleContactsContainer.parents('#addpeople_contacts_list'), 400);
            }
        }