function adjustBounds(el, box) {

    var win = document.defaultView;

    var doc = el.ownerDocument;

    var body = doc.body;

    var docElem = doc.documentElement;

    var clientTop  = docElem.clientTop  || body.clientTop  || 0;

    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var scrollTop  = win.pageYOffset || docElem.scrollTop;

    var scrollLeft = win.pageXOffset || docElem.scrollLeft;

    var top  = box.top  + scrollTop  - clientTop;

    var left = box.left + scrollLeft - clientLeft;



    return {

        top: top,

        left: left,

        bottom: top + box.height,

        height: box.height,

        width: box.width

    };

}