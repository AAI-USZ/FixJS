function (req, res) {
    console.log("app path : %s", global.APP_PATH);
    
    var app = new Framework(req, res).createApp(config);
    //app.setView("ejs");
    //app.setRoute(routeParser);
    app.run();
}