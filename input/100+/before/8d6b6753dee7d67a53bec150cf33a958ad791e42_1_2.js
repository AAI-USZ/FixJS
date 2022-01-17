function(done) {
        app = express.createServer();

        app.configure(function(){
            app.set('port', 4816);
            app.use(app.router);
        });

        app.get("/missing", function(req, res, next) {
            res.send("Not here", 404);
        });

        app.get("/image.png", function(req, res, next) {
            res.sendfile(__dirname + "/image.png");
        });

        app.get("/user1.html", function(req, res, next) {
            res.send("<html><head><title>User 1</title></head>"+
                     "<body><p>No rel-me links here.</p></body></html>", 200);
        });

        app.get("/user2.html", function(req, res, next) {
            res.send("<html><head><title>User 2</title></head>"+
                     "<body><ul>"+
                     "<li><a href='http://photo.example.com/user2'>Photo User 2</a></li>"+
                     "<li><a href='http://geo.example.com/user2' rel='me'>Geo User 2</a></li>"+
                     "<li><a href='http://user2.example.net/blog' rel='me'>User 2 blog</a></li>"+
                     "<li><a rel='me'>No HREF</a></li>"+
                     "<li><a href='http://geo.example.com/user2' rel='me'>Dupe</a></li>"+
                     "<li><a href='http://video.example.com/user2' rel='me video'>Video User 2</a></li>"+
                     "<li></ul></body></html>", 200);
        });


        app.on("listening", function() {
            console.log("Listening");
            done();
        });

        app.on("error", function(err) {
            console.log("Error");
            done(err);
        });

        app.listen(4816, "localhost");
    }