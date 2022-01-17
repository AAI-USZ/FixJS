function route_info(ac){
    var methods = "";
    var name=""; 
    var action = ac.action;
    var path = ac.http.getRequest().url;
    if(action==="index" && path==="/"){
      name = ac.app.routes.root_route.name;
      Object.keys(ac.app.routes.root_route.verbs).forEach(function(n) {
        methods += n + ", ";
      });   
    }else if(action==="index"){
      name = ac.app.routes.index_route.name;
      Object.keys(ac.app.routes.index_route.verbs).forEach(function(n) {
        methods += n + ", ";
      });
    }else {
      name = ac.app.routes.show_route.name;
      Object.keys(ac.app.routes.show_route.verbs).forEach(function(n) {
          methods += n + ", ";
      });
    }
    return {
      "path": path, 
      "name": name,
      "methods": methods.replace(/, $/,"")
    }; 
  }