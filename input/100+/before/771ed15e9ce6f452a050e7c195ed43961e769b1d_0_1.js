function onPopupMessageHandler(e) {
    // Parse menu messages
    var message = decodeMessage(e.data);
    if (options.locked) return;
    if (message.type) {
        switch (message.type) {
            case 'block_ads':
                run.blockElement(true);
                break;
            case 'block_ele':
                run.blockElement();
                break;
            case 'unblock_ele':
                run.unblockElement();
                break;
            case 'unblock_latest':
                run.unblockElement(true);
                break;
            case 'content_block_helper':
                run.contentBlockHelper();
                break;
            case 'show_preferences':
                options.showPreferences(domain);
                break;
            case 'ask_menu_status':
                e.source.postMessage(encodeMessage({type: 'menu_status_enable'}));
                break;
        }
    }
}