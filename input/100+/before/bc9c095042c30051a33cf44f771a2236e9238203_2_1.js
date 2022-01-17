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

                $signinbuttonwrapper.show();

                $('html').addClass("requireAnon");
                // the user is anonymous and should be able to log in
                renderedTemplate = sakai.api.Util.TemplateRenderer(pageNotFoundErrorLoggedOutTemplate, sakai.data.me.user).replace(/\r/g, '');
                $(pageNotFoundError).append(renderedTemplate);
                // Set the link for the sign in button
                var redurl = window.location.pathname + window.location.hash;
                // Parameter that indicates which page to redirect to. This should be present when
                // the static 403.html and 404.html page are loaded
                if ($.deparam.querystring().url){
                    redurl = $.deparam.querystring().url;
                }
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
                renderedTemplate = sakai.api.Util.TemplateRenderer(pageNotFoundErrorLoggedInTemplate, sakai.data.me.user).replace(/\r/g, '');
                $(pageNotFoundError).append(renderedTemplate);
                $("#page_not_found_error").addClass("error_page_bringdown");
            }
            $searchinput.live("keydown", function(ev){
                if (ev.keyCode === 13) {
                    doSearch();
                }
            });
            $searchButton.click(doSearch);
            sakai.api.Security.showPage();
            document.title = document.title + " " + sakai.api.i18n.getValueForKey("PAGE_NOT_FOUND");
        }