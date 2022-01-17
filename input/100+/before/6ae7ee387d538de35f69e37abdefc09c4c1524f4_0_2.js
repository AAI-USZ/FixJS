function(exists, profile) {
            if (!profile) {
                sakai.api.Security.sendToLogin();
            } else {
                sakai.api.Security.showPage();
                // Set the profile data object
                sakai_global.profile.main.data = $.extend(true, {}, profile);
                contextData = {
                    "profile": profile,
                    "displayName": sakai.api.User.getDisplayName(profile),
                    "userid": entityID,
                    "altTitle": true,
                    "picture": getUserPicture(profile, entityID)
                };
                document.title = document.title + " " + sakai.api.Util.Security.unescapeHTML(contextData.displayName);
                if (sakai.data.me.user.anon) {
                    contextType = "user_anon";
                    renderEntity();
                    loadSpaceData();
                } else {
                    sakai.api.User.getContacts(checkContact);
                }
            }
        }