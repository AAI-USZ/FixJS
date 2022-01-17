function(slice) {
        var functions = this.getFunctions(),
            style = slice.dom.style;

//        style.display = 'none';

        if (Ext.os.is.iOS || Ext.os.is.Android3 || Ext.browser.is.firefox) {
            style.webkitTransform = 'translate3d(0px, -10000px, 0px)';
            style.MozTransform = 'translate3d(0px, -10000px, 0px)';
        }
        else {
            style.top = '-10000px';
        }

//        this.setSlicePosition(slice, 0, this.getCurrentAxis());

        functions.deactivate.call(functions.scope, slice);
    }