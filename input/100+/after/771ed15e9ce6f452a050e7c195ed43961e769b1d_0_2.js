function onMessageHandler(e) {
    var message = decodeMessage(e.data);
    if (message.type === 'noads_bg_port') {
        var channel = new MessageChannel();
        e.ports[0].postMessage(encodeMessage({type: 'noads_tab_port'}), [channel.port2]);
        channel.port1.onmessage = onPopupMessageHandler;
    } else if (message.type === 'noadsadvanced_autoupdate') {
        notification_text = message.text;
        if (loaded && notification_text !== '') {
            onNotifyUser(notification_text);
            notification_text = '';
        }
    } else if (message.type === 'ask_status') {
        e.source.postMessage(encodeMessage({type: 'status_enabled'}));
    }

}