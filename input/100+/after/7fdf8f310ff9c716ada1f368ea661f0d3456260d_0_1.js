function(settings) {
        var selectors = {
            message_list_selector:    '#mm-message-list',
            status_selector:          '#mm-status-message-container',
            login_selector:           '#mm-login-container',
            username_selector:        '#mm-received-username',
            htauth_username_selector: '#mm-htauth-username',
            htauth_password_selector: '#mm-htauth-password'
        };
        if (settings) {
            if (typeof settings.url_root === 'string') {
                url_root = settings.url_root;
            }
            if (typeof settings.want_unique_locks !== 'undefined') {
                want_unique_locks = settings.want_unique_locks;
            }
            if (typeof settings.msg_prefix === 'string') {
                want_unique_locks = settings.msg_prefix;
            }
            for (var sel in selectors) {
                if (typeof settings[sel] === 'string') {
                    selectors[sel] = settings[sel];
                }
            }
        }
        $message_list_element = $(selectors.message_list_selector);
        $status_element = $(selectors.status_selector);
        $login_element = $(selectors.login_selector);
        $htauth_username = $(selectors.htauth_username_selector);
        $htauth_password = $(selectors.htauth_password_selector);
    }