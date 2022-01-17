function onMessageHandler (e) {
    if (!e || !e.data) return;
    // if we want to interact with the menu from injected script
    if (decodeMessage(e.data).type === 'status_enabled') {
        if (document && document.body) {
            document.body.style.color = 'black';
        }
        enabled = true;
    }
}