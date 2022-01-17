function cursorX(elem, evt) {
    if(isFixed(elem)) {
        var bodyLeft = parseInt(document.defaultView.getComputedStyle(document.body, "").marginLeft, 10) - calc(elem, 'scrollLeft') + window.pageXOffset + elem.style.marginLeft;

        return evt.clientX - bodyLeft;
    }
    if(evt.pageX) return evt.pageX;
    else if(evt.clientX)
        return evt.clientX + document.body.scrollLeft;
}