function(){
            entityID = sakai.api.Util.extractEntity(window.location.pathname);
            if (entityID && entityID !== sakai.data.me.user.userid) {
                sakai.api.User.getUser(entityID, getProfileData);
            } else if (!sakai.data.me.user.anon) {
                if (entityID) {
                    document.location = "/me" + window.location.hash;
                    return;
                }
                sakai.api.Security.showPage();
                contextType = "user_me";
                // Set the profile data object
                sakai_global.profile.main.data = $.extend(true, {}, sakai.data.me.profile);
                sakai_global.profile.main.mode.value = "edit";
                contextData = {
                    "profile": sakai.data.me.profile,
                    "displayName": sakai.api.User.getDisplayName(sakai.data.me.profile),
                    "userid": sakai.data.me.user.userid,
                    "picture": sakai.api.User.getProfilePicture(sakai.data.me.profile),
                    "addArea": "user"
                };
                document.title = document.title + " " + sakai.api.Util.Security.unescapeHTML(contextData.displayName);
                renderEntity();
                loadSpaceData();
            } else {
                sakai.api.Security.sendToLogin();
            }
        }