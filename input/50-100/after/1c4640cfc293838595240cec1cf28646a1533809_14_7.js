function(done){

        var tm = new Menu('MyMenu'), req = calipsoHelper.requests.testUser;

        tm.addMenuItem(req, simpleMenuBasic);
        tm.addMenuItem(req, childMenuShort);
        tm.addMenuItem(req, childMenuDeep);
        tm.addMenuItem(req, childMenuDeepLater);

        // Mock request object
        var html = tm.render(req);

        html.should.match(/MyMenu/);

        done();

    }