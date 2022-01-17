function(offset) {
        this.header.renderElement.dom.style.webkitTransform = (offset === null) ? null : 'translate3d(0px, -' + offset + 'px, 0px)';
        this.header.renderElement.dom.style.MozTransform = (offset === null) ? null : 'translate3d(0px, -' + offset + 'px, 0px)';
    }