function(routes) {



    var app = module.exports = express.createServer();

    /**

    * CONFIGURATION

    * -------------------------------------------------------------------------------------------------

    * set up any custom middleware (errorHandler), custom Validation (signatureValidator)

    **/



    app.configure(function() {

        app.use(express.methodOverride());

        app.use(app.router);

    });



    app.configure('development', function(){

        app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

    });



    app.configure('production', function(){

        app.use(express.errorHandler()); 

    });



    /**

    * ROUTING

    * -------------------------------------------------------------------------------------------------

    * dynamic route loaders

    **/



    app.routePlugins = routes;



     // route specific middleware for ITK service routes

    var common = [

         require('./middleware/logger'),

         require('./middleware/soapHandler'),

         require('./middleware/jsonParser'),

         require('./middleware/soapValidator'),

         require('./middleware/verifySignature')];



    for(var i = 0; i < routes.length; i++) {

        app.post(routes[i].route, common, routes[i].custommiddleware, routes[i].process);

    }



    // Global Routes - this should be last!

    require('./routes/global')(app);



    // need to build from config

    app.queueProvider = new QueueProvider('localhost', 27017);

    return app;

}