function() {
    var all = this.paths;
    if(this._shouldUseBrowserRequire()) {
      var browserRequirePath = new Path({
        type: "include", 
        path: __dirname + "/browser-require.js"
      });
      var browserRequireHackPath = new Path({
        type: "include",
        path: __dirname + "/browser-require-hack.js"
      });
      all = [browserRequirePath, browserRequireHackPath].concat(all);
    }
    console.log("ALL", all);
    return all;
  }