function() { 
    app.use(express.bodyParser()); 
    app.use(app.router); 
}