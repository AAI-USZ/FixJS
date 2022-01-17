function (node) {
            this._reflow = $.support.transition &&
                node.length && node[0].offsetWidth;
        }