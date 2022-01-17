function (controllerFullName) {
    if (app.enabled('commonjs ctl')) {
        return railway.controller.loadNew(controllerFullName, this.root);
    } else {
        return railway.controller.load(controllerFullName, this.root);
    }
}