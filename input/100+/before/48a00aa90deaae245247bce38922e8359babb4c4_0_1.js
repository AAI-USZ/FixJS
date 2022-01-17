function onConnectHandler (e) {
        var atab = opera.extension.tabs.getFocused();
        if (!atab) return;
        // if we got a message fom the menu
        if (e && e.origin && ~e.origin.indexOf('menu.html') && ~e.origin.indexOf('widget://')) {
            atab.postMessage(encodeMessage({ type: 'noads_bg_port' }), [e.source]);
        } else {
            // if we got a message fom a page
            if (notification_text !== '') {
                atab.postMessage(encodeMessage({ type: 'noadsadvanced_autoupdate', text: notification_text}));
                notification_text = '';
            }
            if (e.tab == opera.extension.tabs.getFocused()) {
                // make sure the button disabled until the atab is ready if the atab is reloaded
                button.disabled = true;
            }
        }
    }