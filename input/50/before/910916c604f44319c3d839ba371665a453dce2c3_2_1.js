function () {
    console.log("app path : %s", APP_PATH);
    
    var app = new Framework().createApp(config);
    //app.setView("ejs");
    //app.setRoute(routeParser);
    app.run();
}