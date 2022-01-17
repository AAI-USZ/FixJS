function local(args, cb) {
  var argObj;
  try {
     argObj = common.parseArgs(args);

    if(argObj.app !== undefined ){/*look for alias*/
      argObj.app = fhc.appId(argObj.app);
    }
    if(!argObj.domain) {
      argObj.domain = fhc.targetDomain;
    }

    validateArgs(argObj);

  } catch (x) {
    return cb("Error processing args: " + x + "\nUsage: " + local.usage);
  }

  if(argObj.packages) {
    argObj.packages = argObj.packages.split(",");
  }
  argObj.proxy = argObj.proxy === "true";
  argObj.watch = argObj.watch === "true";
  

  var server = new LocalServer(argObj);
  server.on("error", cb);
  server.start(argObj.port);
}