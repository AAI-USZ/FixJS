function() {
  var env;

  console.log("loading cloud code...");

  try {
    var cloudPath = require.resolve(path.join(process.cwd(), this.cloud, this.main));
    delete require.cache[cloudPath];
    env = require(cloudPath);

    if(!Object.keys(env).length) {
      throw new Error("Looks like you didn't export any functions. Is this a rhino app?");
    }
    if(env) {
      this.env = env;
      log.info("cloud code loaded...");
    }
  }
  catch(e) {
    if(this.env) {
      //we have an environment loaded but we got an error trying to reload
      log.error("Failed to reload environment, using current version");
      log.error(e);
    }
    else {
      throw e;
    }
  }
}