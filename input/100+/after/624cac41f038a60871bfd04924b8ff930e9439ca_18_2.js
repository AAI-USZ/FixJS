function(items, total) {
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
            }