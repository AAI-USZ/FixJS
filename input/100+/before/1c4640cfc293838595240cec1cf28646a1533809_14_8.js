function(){

     it('I can recursively scan the menu tree', function(done){    

      var tm = new Menu('MyMenu'), req = calipsoHelper.requests.testUser;
      tm.addMenuItem(req, simpleMenuBasic);
      tm.addMenuItem(req, childMenuShort);
      tm.addMenuItem(req, childMenuDeep);
      tm.addMenuItem(req, childMenuDeepLater);

      var output = [];
      var menuFn = function(menu) {
          return menu.path;
      }
      tm.fnRecurse(tm,menuFn,output);

      output.length.should.equal(5);
      output[0].should.equal(simpleMenuBasic.path);

      done();

    });

    it('I can highlight selected menu items in a tree based on current url matching', function(done){    

        var tm = new Menu('MyMenu'), req = calipsoHelper.requests.testUser;

        // Over-ride the url
        req.url = '/bob/child';

        tm.addMenuItem(req, simpleMenuBasic);
        tm.addMenuItem(req, childMenuShort);
        tm.addMenuItem(req, childMenuDeep);
        tm.addMenuItem(req, childMenuDeepLater);

        var selected = tm.selected(req);
        selected.length.should.equal(2);
        selected[0].should.equal(simpleMenuBasic.path);
        selected[1].should.equal(childMenuShort.path);
        done();

    });

    it('I can render a menu as html', function(done){    
    
        var tm = new Menu('MyMenu'), req = calipsoHelper.requests.testUser;

        tm.addMenuItem(req, simpleMenuBasic);
        tm.addMenuItem(req, childMenuShort);
        tm.addMenuItem(req, childMenuDeep);
        tm.addMenuItem(req, childMenuDeepLater);

        // Mock request object
        var html = tm.render(req);

        html.should.include("MyMenu");
        
        done();

    }); 


  }