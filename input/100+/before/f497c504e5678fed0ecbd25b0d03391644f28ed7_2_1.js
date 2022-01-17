function onConnectHandler (e) {
        var tab = opera.extension.tabs.getFocused();
        if (!tab) return;
        // if we got a message fom the menu
        if (e && e.origin && ~e.origin.indexOf('menu.html') && ~e.origin.indexOf('widget://')) {
            tab.postMessage(encodeMessage({ type: 'noads_bg_port' }), [e.source]);
        } else {
            // if we got a message fom a page
            if (notification_text !== '') {
                tab.postMessage(encodeMessage({ type: 'noadsadvanced_autoupdate', text: notification_text}));
                notification_text = '';
            }
            enableButton();
        }
    }