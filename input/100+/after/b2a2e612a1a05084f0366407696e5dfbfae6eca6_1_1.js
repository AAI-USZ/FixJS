function(){
        var d = new Router();
        d.route('/', function(req, res){ res.send("hello world");});
        var handler = d.getHandler('/?asdf=1234');
        should.exist(handler.GET);
    }