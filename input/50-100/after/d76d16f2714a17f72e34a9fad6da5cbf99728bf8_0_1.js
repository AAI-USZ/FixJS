function(route){
  console.log("routing", route);
  var methods = route[2] || "GET";

  methods.forEach(function(method){
    var params = [];
    app[method](route[0], params, route[1]);
  });
}