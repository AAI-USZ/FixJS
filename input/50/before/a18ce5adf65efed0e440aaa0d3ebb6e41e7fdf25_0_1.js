function(transform) {
        var style = this.map.layerContainerDiv.style;
        style['-webkit-transform'] = transform;
        style['-moz-transform'] = transform;
    }