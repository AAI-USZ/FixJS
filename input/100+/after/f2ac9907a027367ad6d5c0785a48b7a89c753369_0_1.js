function callCb(cb, elem, e) {
    e.preventDefault();

    var offset = findPos(elem);
    var width = elem.clientWidth;
    var height = elem.clientHeight;
    var cursor = {
        x: cursorX(elem, e),
        y: cursorY(elem, e)
    };
    var x = (cursor.x - offset.x) / width;
    var y = (cursor.y - offset.y) / height;

    cb({
        x: isNaN(x)? 0: x,
        y: isNaN(y)? 0: y,
        cursor: cursor,
        elem: elem,
        e: e
    });
}