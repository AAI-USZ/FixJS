function isDesktopFF() {
        return document.location.search.indexOf('product=desktop') >= 0 ||
               document.location.search.indexOf('product=beta') >= 0;
    }