function () {
        var opts = {
            viewportSize: {
                height: 100,
                width: 200
            }
        };
        checkViewportSize(new WebPage(opts), opts.viewportSize);
    }