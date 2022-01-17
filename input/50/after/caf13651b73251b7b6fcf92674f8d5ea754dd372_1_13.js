function () {
        var opts = {
            scrollPosition: {
                left: 1,
                top: 2
            }
        };
        checkScrollPosition(new WebPage(opts), opts.scrollPosition);
    }