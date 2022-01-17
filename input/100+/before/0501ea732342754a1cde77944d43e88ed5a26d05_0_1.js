function local(args, cb) {
  try {
    var argObj = common.parseArgs(args);

    if(argObj.app !== undefined ){/*look for alias*/
      argObj.app = fhc.appId(argObj.app);
    }
    if(!argObj.domain) {
      argObj.domain = fhc.target;
    }

    if(argObj.proxy !== undefined && argObj.proxy !== "true") {
      defaultArgs.app.required = false;
      defaultArgs.domain.required = false;
    }
    validateArgs(argObj);

  } catch (x) {
    return cb("Error processing args: " + x + "\nUsage: " + local.usage);
  }

  if(argObj.packages) {
    argObj.packages = argObj.packages.split(",");
  }

  var server = new LocalServer(argObj);
  server.start(argObj.port);
}