function() {
            var querystring = new Querystring();
            if (querystring.contains('welcome') && querystring.get('welcome') === 'true' && !sakai.data.me.user.anon) {
                sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('WELCOME') + ' ' + sakai.api.User.getFirstName(sakai.data.me.profile), sakai.api.i18n.getValueForKey('YOU_HAVE_CREATED_AN_ACCOUNT'));
            }
        }