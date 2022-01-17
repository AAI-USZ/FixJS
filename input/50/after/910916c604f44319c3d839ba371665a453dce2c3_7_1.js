function Router (req) {
    this.controller = "index";
    this.action     = "show";
    this.routerParser = defaultRouterParser;
    this.req = req;
}