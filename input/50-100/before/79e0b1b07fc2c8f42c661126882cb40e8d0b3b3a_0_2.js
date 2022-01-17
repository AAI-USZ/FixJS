function cursorY(elem, evt) {
    if(isFixed(elem)) {
        var bodyTop = parseInt(document.defaultView.getComputedStyle(document.body, "").marginTop, 10);

        return evt.clientY - bodyTop;
    }
    if(evt.pageY) return evt.pageY;
    else if(evt.clientY)
        return evt.clientY + document.body.scrollTop;
}