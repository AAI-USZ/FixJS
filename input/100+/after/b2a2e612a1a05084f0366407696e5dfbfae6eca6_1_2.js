function(){
        var d = new Router();
        d.route('/', { GET : function(req, res){res.end("GET");}});
        var req = { url : "http://asdf.com/?asdf=1234", method : "GET"};
        d.dispatch(req, this.res);
        this.res.expectEnd("GET");
    }