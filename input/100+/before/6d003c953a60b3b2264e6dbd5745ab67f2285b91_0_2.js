function(el, button, count, timeout, callback) {
    var clicks = 0;
    var startX, startY;

    var listener = function(e) {
        clicks += 1;
        if (clicks == 1) {
            startX = e.clientX;
            startY = e.clientY;

            setTimeout(function() {
                clicks = 0;
            }, timeout || 600);
        }

        var isButton = exports.getButton(e) == button;
        if (!isButton || Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)
            clicks = 0;

        if (clicks == count) {
            clicks = 0;
            callback(e);
        }

        if (isButton)
            return exports.preventDefault(e);
    };

    exports.addListener(el, "mousedown", listener);
    useragent.isOldIE && exports.addListener(el, "dblclick", listener);
}