function (that) {
        that.options.listeners = that.options.listeners || {};
        that.options.listeners.onSelect = function () {
            that.select();
        };
        // TODO: This need to move into defaults.
        that.options.listeners.afterRender = function () {
        	that.bindEvents();
        };
    }