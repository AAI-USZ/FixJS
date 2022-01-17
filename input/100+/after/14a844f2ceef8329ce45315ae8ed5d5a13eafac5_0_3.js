function(e) {
    var tag = e.target.tagName && e.target.tagName.toLowerCase();
    if (tag == "input" || tag == "textarea") { return; }

    var key = String.fromCharCode(e.keyCode).toLowerCase();

    if (key == "g") {
        ACTIVE = true;
    } else if (ACTIVE) {
        ACTIVE = false;
        if (typeof SHORTCUTS[key] == "string") {
            var dest = SHORTCUTS[key];
            window.location.href = dest;
            return false;
        } else if (typeof SHORTCUTS[key] == "function") {
            SHORTCUTS[key]();
            return false;
        }
    }
}