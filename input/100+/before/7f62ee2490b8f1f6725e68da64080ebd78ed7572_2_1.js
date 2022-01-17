function(length) {
        var axis = this.getAxis(),
            endElementStyle = this.endElement.dom.style,
            middleElementStyle = this.middleElement.dom.style,
            endElementLength = this.endElementLength,
            endElementOffset = length - endElementLength,
            middleElementLength = endElementOffset - this.startElementLength;

        if (axis === 'x') {
            endElementStyle.webkitTransform = 'translate3d(' + endElementOffset + 'px, 0, 0)';
            endElementStyle.mozTransform = 'translate3d(' + endElementOffset + 'px, 0, 0)';
            middleElementStyle.webkitTransform = 'translate3d(0, 0, 0) scaleX(' + middleElementLength + ')';
            middleElementStyle.mozTransform = 'translate3d(0, 0, 0) scaleX(' + middleElementLength + ')';
        }
        else {
            endElementStyle.webkitTransform = 'translate3d(0, ' + endElementOffset + 'px, 0)';
            endElementStyle.mozTransform = 'translate3d(0, ' + endElementOffset + 'px, 0)';
            middleElementStyle.webkitTransform = 'translate3d(0, 0, 0) scaleY(' + middleElementLength + ')';
            middleElementStyle.mozTransform = 'translate3d(0, 0, 0) scaleY(' + middleElementLength + ')';
        }
    }