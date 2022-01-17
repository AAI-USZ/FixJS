function() {
        var element = this.getElement();

        if (element && !element.isDestroyed) {
            element.dom.style.webkitTransform = null;
            element.dom.style.mozTransform = null;
        }

        this.callParent(arguments);
    }