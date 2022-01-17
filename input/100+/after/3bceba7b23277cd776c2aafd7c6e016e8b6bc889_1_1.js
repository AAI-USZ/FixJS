function onConnectHandler (e) {
        var atab = opera.extension.tabs.getFocused();
        if (!atab || !e) return;
        // if we got a message fom the menu
        if (e.origin && ~e.origin.indexOf('menu.html') && ~e.origin.indexOf('widget://')) {
            atab.postMessage(encodeMessage({ type: 'noads_bg_port' }), [e.source]);
        } else {           
            // if we got a message fom a page
            if (notification_text !== '') {
                atab.postMessage(encodeMessage({
                    type: 'noadsadvanced_autoupdate',
                    text: notification_text
                }));
                notification_text = '';
            }
            
            // button will be disabled for new tabs
            button.disabled = true;       
            // Start a timed loop
            var loop = setInterval(function () {
                // When the page has finished loading, turn the button on
                if (isAccessible(atab)) {
                    button.disabled = false;
                    clearInterval(loop);
                }
            }, 100);
        }
    }