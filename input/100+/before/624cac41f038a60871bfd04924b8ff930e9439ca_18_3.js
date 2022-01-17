function(callback){
            $.ajax({
                url: sakai.config.URL.CONTACTS_FIND_STATE,
                data: {
                    "state": "INVITED",
                    "page": 0,
                    "items": 1000
                },
                cache: false,
                success: function(data){
                    contacts.invited = data;
                    for (var i in contacts.invited.results) {
                        if (contacts.invited.results.hasOwnProperty(i)){
                            contacts.invited.results[i].linkTitle = sakai.api.i18n.getValueForKey("VIEW_USERS_PROFILE").replace("{user}", sakai.api.User.getDisplayName(contacts.invited.results[i].profile));
                        }
                    }
                    renderPendingContacts();
                    callback();
                }
            });
        }