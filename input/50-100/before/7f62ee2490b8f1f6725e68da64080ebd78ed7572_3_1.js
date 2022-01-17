function(offset) {
        var axis = this.getAxis(),
            domStyle = this.element.dom.style;

        if (axis === 'x') {
            domStyle.webkitTransform = 'translate3d(' + offset + 'px, 0, 0)';
            domStyle.mozTransform = 'translate3d(' + offset + 'px, 0, 0)';
        }
        else {
            domStyle.webkitTransform = 'translate3d(0, ' + offset + 'px, 0)';
            domStyle.mozTransform = 'translate3d(0, ' + offset + 'px, 0)';
        }
    }