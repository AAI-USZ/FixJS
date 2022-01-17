function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        }