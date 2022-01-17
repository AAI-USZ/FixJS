function(){
            var externalAuth = false;
            if (!sakai.config.Authentication.internal && !sakai.config.Authentication.allowInternalAccountCreation) {
                externalAuth = true;
            }
            var auth = {
                "externalAuth": externalAuth,
                "internalAndExternal": sakai.config.Authentication.internalAndExternal,
                "Authentication": sakai.config.Authentication
            };
            $(topnavUserContainer).html(sakai.api.Util.TemplateRenderer(topnavUserTemplate, {
                "anon" : sakai.data.me.user.anon,
                "auth": auth,
                "displayName": sakai.api.User.getDisplayName(sakai.data.me.profile),
                "sakai": sakai
            }));
            if (externalAuth){
                setExternalLoginRedirectURL();
            }
        }