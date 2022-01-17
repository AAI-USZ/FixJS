function cursorY(elem, evt) {
    if(isFixed(elem)) {
        var bodyTop = parseInt(getStyle(document.body, 'marginTop'), 10) -
            calc(elem, 'scrollTop') + window.pageYOffset +
            elem.style.marginTop;

        return evt.clientY - bodyTop;
    }
    if(evt.pageY) return evt.pageY;
    else if(evt.clientY)
        return evt.clientY + document.body.scrollTop;
}