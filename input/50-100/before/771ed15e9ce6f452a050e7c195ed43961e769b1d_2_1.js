function onMessageHandler (e) {
    if (!e || !e.data) return;
    // if we want to interact with the menu from injected script
    if (decodeMessage(e.data).type === 'menu_status_enable') {
        if (document && document.body) {
            document.body.style.color = 'black';
        }
        enabled = true;
    }
}