function(offset) {
        var axis = this.getAxis(),
            elementStyle = this.element.dom.style;

        offset = Math.round(offset);

        if (axis === 'x') {
            elementStyle.webkitTransform = 'translate3d(' + offset + 'px, 0, 0)';
            elementStyle.MozTransform = 'translate3d(' + offset + 'px, 0, 0)';
        }
        else {
            elementStyle.webkitTransform = 'translate3d(0, ' + offset + 'px, 0)';
            elementStyle.MozTransform = 'translate3d(0, ' + offset + 'px, 0)';
        }
    }