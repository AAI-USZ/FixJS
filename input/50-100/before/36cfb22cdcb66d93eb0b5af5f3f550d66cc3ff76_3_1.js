function(a, callback){
    if (a == null){
      a = new App();
      a.createAppBackboneObjects();
    }
    window.app = a;

    // Create and display the AppView and its dependants
    window.appView = new AppView({model: a}); 
    window.appView.render();
    
    // Start the Router
    app.router = new AppRouter();
    Backbone.history.start();
    
    if(typeof callback == "function"){
      callback();
    }
    
  }