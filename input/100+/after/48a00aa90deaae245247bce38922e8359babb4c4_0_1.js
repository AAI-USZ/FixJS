function onConnectHandler (e) {
        var atab = opera.extension.tabs.getFocused();
        if (!atab || !e) return;
        // if we got a message fom the menu
        if (e.origin && ~e.origin.indexOf('menu.html') && ~e.origin.indexOf('widget://')) {
            atab.postMessage(encodeMessage({ type: 'noads_bg_port' }), [e.source]);
        } else {
            // if we got a message fom a page
            if (notification_text !== '') {
                atab.postMessage(encodeMessage({ type: 'noadsadvanced_autoupdate', text: notification_text}));
                notification_text = '';
            }
            if (typeof e.tab !== 'undefined' && e.tab == opera.extension.tabs.getFocused()) {
                // make sure the button disabled in 12 after reload until it's ready
                button.disabled = true;
            }
        }
    }