function(
    App,
    AppView,
    AppRouter,
    Corpus,
    DataList,
    Datum,
    Session,
    User,
    UserWelcomeView,
    Handlebars,
    compiledTemplates,
    Backbone,
    forcingpouchtoloadonbackboneearly
) {
  /*
   * Helper functions
   */
  
  /**
   * This function is the only place that starts the app, notably the app view and app router. 
   * It is called either by the main.js or by the UserWelcomeView.js
   */
  window.startApp = function(a, callback){
    window.app = a;

    // Create and display the AppView and its dependents
    window.appView = new AppView({model: a}); 
    window.appView.render();
    
    // Start the Router
    app.router = new AppRouter();
    Backbone.history.start();
    
    if(typeof callback == "function"){
      callback();
    }
    
  };
  loadFreshApp = function(){
    Utils.debug("Loading fresh app");
    // Create a UserWelcomeView modal
    var welcomeUserView = new UserWelcomeView();
    welcomeUserView.render();
    $('#user-welcome-modal').modal("show");
  }
  /*
   * End functions
   */
  
  
  /*
   * Start the pub sub hub
   */
  window.hub = {};
  Utils.makePublisher(window.hub);
  
  /*
   * Clear the app completely
   * TODO this doesnt work any more because each corpus is in a different pouch.
   */
//  Pouch.destroy('idb://db');
//  Pouch.destroy('idb://dbdefault');
//    Pouch.destroy('idb://dbsapir-firstcorpus');
//    localStorage.clear();
//  localStorage.removeItem("appids");
//  localStorage.removeItem("corpusname");
//  ids.corpusid = "4C1A0D9F-D548-491D-AEE5-19028ED85F2B";
//  ids.sessionid = "1423B167-D728-4315-80DE-A10D28D8C4AE";
//  ids.datalistid = "1C1F1187-329F-4473-BBC9-3B15D01D6A11";
  
  
  /*
   * Check for user's cookie and the dashboard so we can load it
   */
  var username = Utils.getCookie("username");
  if (username != null && username != "") {
    alert("Welcome again " + username);
    var appjson = localStorage.getItem("mostRecentDashboard");
    appjson = JSON.parse(appjson);
    if (appjson == null){
      alert("We don't know what dashbaord to load for you. Please login and it should fix this problem.");
      loadFreshApp();
    }else if (appjson.length < 3) {
      alert("There was something inconsistent with your prevous dashboard. Please login and it should fix the problem.");
      loadFreshApp();
    }else{
      Utils.debug("Loading app from localStorage");
      var corpusname = null;
      var couchConnection = null;
      if(!localStorage.getItem("mostRecentCouchConnection")){
        alert("We can't accurately guess which corpus to load. Please login and it should fix the problem.");
        loadFreshApp();
      }else{
        corpusname = JSON.parse(localStorage.getItem("mostRecentCouchConnection")).corpusname;
        couchConnection = JSON.parse(localStorage.getItem("mostRecentCouchConnection"));
        if(!localStorage.getItem("db"+corpusname+"_id")){
          alert("We couldn't open your local database. Please login and it should fix the problem.");
          loadFreshApp();
        }else{
          if(!localStorage.getItem("encryptedUser")){
            alert("Your corpus is here, but your user details are missing. Please login and it should fix this problem.");
            loadFreshApp();
          }else{
            a = new App();
            var auth = a.get("authentication");
            var u = localStorage.getItem("encryptedUser");
            auth.loadEncryptedUser(u, function(success, errors){
              if(success == null){
                alert("We couldnt log you in."+errors.join("<br/>") + " " + Utils.contactUs);  
                loadFreshApp();
              }else{
                a.createAppBackboneObjects(corpusname, function(){
                  window.startApp(a, function(){
                    window.app.loadBackboneObjectsById(couchConnection, appjson);
                  });
                });
              }
            });
          }
        }
      }
    }
  } else {
    //new user, let them register or login as themselves or sapir
    loadFreshApp();
 }
  
  
}