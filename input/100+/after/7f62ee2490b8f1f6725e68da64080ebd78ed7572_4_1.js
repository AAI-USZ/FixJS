function(slice, position, axis) {
        var style = slice.dom.style;

        position = (-position) + 'px';

        if (axis === 'x') {
            style.left = position;
        }
        else {
            if (Ext.os.is.iOS || Ext.os.is.Android3 || Ext.browser.is.firefox) {
                style.webkitTransform = 'translate3d(0px, ' + position + ', 0px)';
                style.MozTransform = 'translate3d(0px, ' + position + ', 0px)';
            }
            else {
                style.top = position;
            }
        }
    }