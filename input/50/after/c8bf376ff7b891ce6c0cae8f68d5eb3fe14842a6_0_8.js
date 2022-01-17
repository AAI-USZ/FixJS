function(){
        var object = new Application.Book();
        ok(Application.checkForProperty(object,"name"));
    }