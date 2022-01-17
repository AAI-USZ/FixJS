function Application(req, res, config) {
    if (typeof config !== "object") {
        throw new Error("config error");
    }

    this.req = req;
    this.res = res;
    this.config = config;
    this.path = global.APP_PATH;
    this.controllerPath = this.path + '/controller';
    this.viewPath = this.path + '/views';
    this.view = config.view || "ejs";

    this.router = new Router(this.req);
}