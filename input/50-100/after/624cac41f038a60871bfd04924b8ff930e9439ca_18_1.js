function(){
            if (sakai_global.profile.main.mode.value !== "view") {
                if (!contacts.initialized) {
                    // we only want to render the pending contacts list once
                    getPendingFromOther();
                }
                getAccepted();
            } else {
                contacts.invited = false;
                sakai.api.User.getContacts(function(){
                    getAccepted();
                });
            }
        }