function(x) {
        if (!arguments.length) return gridUrl;
        gridUrl = typeof x === 'function' ?
            x : templatedGridUrl(x);
        return manager;
    }