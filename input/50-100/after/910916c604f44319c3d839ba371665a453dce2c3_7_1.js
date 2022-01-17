function () {
    var uri = this.req.url;

    if (typeof this.routerParser === "function") {
        var route = this.routerParser(uri);
    } else {
        var route = router.parseUri(uri);
    }

    if (typeof route == 'object' && route.controller) {
        this.controller = route.controller;
        if (route.action) {
            this.action = route.action;
        }
    }
}