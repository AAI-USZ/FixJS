function(){
            var renderedTemplate = false;
            if (sakai.config.enableCategories) {
                var catcount = 0;
                for (var i in sakai.config.Directory) {
                    if (sakai.config.Directory.hasOwnProperty(i) && !sakai.config.Directory[i].divider) {
                        catcount+=1;
                    }
                }
                $browsecatcount.text(catcount);
            } else {
                $browsecats.hide();
            }

            // Create the world links in the second column after People, Content...
            var worlds = [];
            var obj = {};
            for (var c = 0; c < sakai.config.worldTemplates.length; c++){
                var world = sakai.config.worldTemplates[c];
                world.label = sakai.api.i18n.getValueForKey(world.titlePlural);
                if(c===sakai.config.worldTemplates.length-1){
                    world.last = true;
                }
                worlds.push(world);
            }
            obj.worlds = worlds;
            $errorsecondcolcontainer.append(sakai.api.Util.TemplateRenderer($secondcoltemplate, obj));

            // display the error page links
            var linkObj = {
                links: sakai.config.ErrorPage.Links,
                sakai: sakai
            };
            $errorPageLinksContainer.html(sakai.api.Util.TemplateRenderer($errorPageLinksTemplate, linkObj));

            if (sakai.data.me.user.anon){
                $(window).bind("ready.login.sakai", function(e) {
                    $(window).trigger("relayout.login.sakai", false);
                });

                $signinbuttonwrapper.show();

                $('html').addClass("requireAnon");
                // the user is anonymous and should be able to log in
                renderedTemplate = sakai.api.Util.TemplateRenderer(permissionsErrorLoggedOutTemplate, sakai.data.me.user).replace(/\r/g, '');
                $(permissionsError).append(renderedTemplate);
                var redurl = window.location.pathname + window.location.hash;
                // Parameter that indicates which page to redirect to. This should be present when
                // the static 403.html and 404.html page are loaded
                if ($.deparam.querystring().url){
                    redurl = $.deparam.querystring().url;
                }
                // Set the link for the sign in button
                $(".login-container button").bind("click", function(){
                    document.location = (gatewayURL + "?url=" + escape(redurl));
                });
                if (sakai.config.Authentication.allowInternalAccountCreation){
                    $("#error_sign_up").show();
                }
            } else {
                // Remove the sakai.index stylesheet as it would mess up the design
                $("LINK[href*='/dev/css/sakai/sakai.index.css']").remove();
                // the user is logged in and should get a page in Sakai itself
                renderedTemplate = sakai.api.Util.TemplateRenderer(permissionsErrorLoggedInTemplate, sakai.data.me.user).replace(/\r/g, '');
                $(permissionsError).append(renderedTemplate);
                $("#permission_error").addClass("error_page_bringdown");
            }
            $searchinput.live("keydown", function(ev){
                if (ev.keyCode === 13) {
                    doSearch();
                }
            });
            $searchButton.click(doSearch);
            sakai.api.Security.showPage();
            document.title = document.title + " " + sakai.api.i18n.getValueForKey("ACCESS_DENIED");
        }