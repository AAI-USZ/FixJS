function(){
            if (sakai_global.profile.main.mode.value !== "view") {
                getPendingFromOther(getAccepted);
            } else {
                contacts.invited = false;
                sakai.api.User.getContacts(function(){
                    getAccepted();
                });
            }
        }