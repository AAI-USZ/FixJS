function() {
  var env;

  console.log("loading cloud code...");

  try {
    var cloudPath = require.resolve(path.join(process.cwd(), this.cloud, this.main));
    //clear the required cloud code from the cache
    //as we won't be requiring anything again here for the local server,
    //it's safe enough to just nuke the cache
    //the module holds an internal reference to the cache which is modified,
    //so we have to loop through all the items in the cache and delete them one by one...
    var cache = require.cache;
    for(var i in cache) if(cache.hasOwnProperty(i)) {
      delete cache[i];
    }
    env = require(cloudPath);

    if(!Object.keys(env).length) {
      this.handleError(new Error("Looks like you didn't export any functions. Is this a rhino app?"));
    }
    if(env) {
      this.env = env;
      console.log("cloud code loaded...");
    }
  }
  catch(e) {
    if(this.env) {
      //we have an environment loaded but we got an error trying to reload
      log.error("Failed to reload environment, using current version");
      log.error(e);
    }
    else {
      log.error(e);
      this.handleError(new Error("Cannot load cloud code"));
    }
  }
}