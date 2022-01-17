function cursorX(evt) {
    if(evt.pageX) return evt.pageX;
    else if(evt.clientX)
        return evt.clientX + (document.documentElement.scrollLeft ?
            document.documentElement.scrollLeft :
            document.body.scrollLeft);
}