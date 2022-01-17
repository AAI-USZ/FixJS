function Application(config) {
    if (typeof config !== "object" || !config.path) {
        throw new Error("config error");
    }

    this.config = config;
    this.path = config.path;
    this.controllerPath = this.path + '/controller';
    this.viewPath = this.path + '/views';
    this.view = config.view || "ejs";

    this.router = new Router;
}