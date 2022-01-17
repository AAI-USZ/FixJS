function isWebPage(what) {
        if (!what || typeof(what) !== "object") {
            return false;
        }
        if (phantom.version.major <= 1 && phantom.version.minor < 3) {
            return what instanceof WebPage;
        } else {
            return what.indexOf('WebPage(') === 0;
        }
    }