function event_favicon() {
    if (!favicon_changed) {
        favicon.change("/static/favicon-event.ico");
        favicon_changed = true;
        if (timeout_id != undefined) {
            clearTimeout(timeout_id);
            timeout_id = undefined;
        }
        if (document.hasFocus()) {
            timeout_id = setTimeout(function() {
                favicon.change("/favicon.ico");
                favicon_changed = false;
            }, 2000);
        }
    }
}