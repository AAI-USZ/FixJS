function() {
            var url = sakai.config.URL.CONTACTS_FIND_STATE;
            var data = {
                'state': 'INVITED'
            };

            // Disable the previous infinite scroll
            if (pendingInfinityScroll) {
                pendingInfinityScroll.kill();
            }

            // Set up the infinite scroll for the list of pending contacts
            pendingInfinityScroll = $(contactsInvitedContainer).infinitescroll(url, data, function(items, total) {
                if (total > 0 && !$(contactsInvited, $rootel).is(':visible')) {
                    $(contactsInvited, $rootel).show();
                }

                $.each(items, function(i, item) {
                    item.linkTitle = sakai.api.i18n.getValueForKey('VIEW_USERS_PROFILE').replace('{user}', sakai.api.User.getDisplayName(item.profile));
                });

                return sakai.api.Util.TemplateRenderer(contactsInvitedTemplate, {
                    'invited': items,
                    'sakai': sakai
                });
            }, false, sakai.config.URL.INFINITE_LOADING_ICON);
        }