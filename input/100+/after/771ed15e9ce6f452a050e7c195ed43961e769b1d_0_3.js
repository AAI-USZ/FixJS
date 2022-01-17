function () {
    if (!(document.documentElement instanceof window.HTMLHtmlElement)) {
        delElement(document.getElementById('sCSS'));
        delElement(document.getElementById('uCSS'));
        delElement(document.getElementById('qbCSS'));
        window.removeEventListener('mousemove', showQuickButton, false);
        window.removeEventListener('keydown', onHotkeyHandler, false);
    } else {
        // don't want that in a frames
        if (window.top === window.self) {
            loaded = true;

            if (notification_text !== '') {
                onNotifyUser(notification_text);
                notification_text = '';
            }
            // Setup hotkeys
            window.addEventListener('keydown', onHotkeyHandler, false);

            // Create menu messaging channel and parse background messages
            opera.extension.onmessage = onMessageHandler;

            if (options.checkEnabled('noads_button_state')) {
                log('Button is enabled...');
                addStyle(quickButtonCSS, 'qbCSS');
                window.addEventListener('mousemove', showQuickButton, false);
            }
            
            sendMessage({type: 'status_enabled'});
        }
    }
}