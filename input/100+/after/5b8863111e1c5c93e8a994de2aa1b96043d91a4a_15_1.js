function(templates) {
            var obj = {};
            var leftMenulinks = [];
            var rightMenuLinks = [];

            $('#topnavigation_container .s3d-jump-link').each(function() {
                if ($($(this).attr('href') + ':visible').length) {
                    $(this).show();
                }
            });
            $('#topnavigation_container .s3d-jump-link').on('click', function() {
                $($(this).attr('href')).focus();
                return false;
            });

            for (var i in sakai.config.Navigation) {
                if (sakai.config.Navigation.hasOwnProperty(i)) {
                    var temp = '';
                    /* Check that the user is anon, the nav link is for anon
                     * users, and if the link is the account create link,
                     * that internal account creation is allowed
                     */
                    var anonAndAllowed = sakai.data.me.user.anon &&
                        sakai.config.Navigation[i].anonymous &&
                        (
                            sakai.config.Navigation[i].id !== 'navigation_anon_signup_link' ||
                            (
                                sakai.config.Navigation[i].id === 'navigation_anon_signup_link' &&
                                sakai.config.Authentication.allowInternalAccountCreation
                            )
                        );
                    var isNotAnon = !sakai.data.me.user.anon &&
                        !sakai.config.Navigation[i].anonymous;
                    var shouldPush = anonAndAllowed || isNotAnon;
                    if (shouldPush) {
                        temp = createMenuList(i, templates);
                        if (sakai.config.Navigation[i].rightLink) {
                            rightMenuLinks.push(temp);
                        } else {
                            leftMenulinks.push(temp);
                        }
                    }
                }
            }
            obj.links = leftMenulinks;
            obj.selectedpage = true;
            obj.sakai = sakai;
            // Get navigation and render menu template
            $(topnavExploreLeft).html(sakai.api.Util.TemplateRenderer(navTemplate, obj));

            obj.links = rightMenuLinks;
            $(topnavExploreRight).html(sakai.api.Util.TemplateRenderer(navTemplate, obj));
            setCountUnreadMessages();
            addBinding();
        }