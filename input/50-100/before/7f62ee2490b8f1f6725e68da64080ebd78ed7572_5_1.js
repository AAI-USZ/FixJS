function(x, y) {
        var domStyle = this.getElement().dom.style;

        if (typeof x != 'number') {
            x = this.x;
        }

        if (typeof y != 'number') {
            y = this.y;
        }

        domStyle.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
        domStyle.mozTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';

        return this.callParent(arguments);
    }