function() {
        var opts = {
            clipRect: {
                height: 100,
                left: 10,
                top: 20,
                width: 200,
            }
        };
        checkClipRect(new WebPage(opts), opts.clipRect);
    }