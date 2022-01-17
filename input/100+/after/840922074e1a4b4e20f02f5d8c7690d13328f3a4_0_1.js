function (router, resources, options, respond) {
  options = options || {};
  //
  // Remark: If resource.restful has been set to "true",
  // use default options
  //
  if(typeof options === "boolean" && options) {
    options = {};
  }

  options.prefix  = options.prefix || '';
  options.strict  = options.strict || false;
  options.exposeMethods = options.exposeMethods || true;

  if(typeof options.explore === "undefined") {
    options.explore = true;
  }

  respond = respond || respondWithResult;

  if (!Array.isArray(resources)){
    resources = [resources];
  }

  if (options.explore) {
    //
    // Bind GET / to a generic explorer view of routing map ( using `director-explorer` )
    //
    router.get('/', function () {
      var rsp = '';
      //
      // Output the basic routing map for every resource
      //
      rsp += de.table(router);
      //
      // Output schema for every resource
      //
      //rsp += prettyPrint(resources)
      this.res.end(rsp);
    });
  }
  _extend(router, resources, options, respond);
}