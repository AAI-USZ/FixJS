function(){
    app.use(express.bodyParser());
    app.use(app.router);
   app.use(express.static(__dirname + '/images'));
}