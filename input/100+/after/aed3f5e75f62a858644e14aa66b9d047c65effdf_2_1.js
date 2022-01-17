function(err) {
      if (err) return cb(err);

      if (args.length == 3) {
        return login([args[1], args[2]], cb);
      }else {
        // attempt to set existing target cookie.. 
        var t = {
          target: tar
        };
        if(args[1]) t['user'] = args[1];

        log.silly(t, "Getting Target");
        var targ = targets.getTarget(t);
        log.silly(targ, "Got Target");
        if (targ == undefined) {
          ini.del("cookie");
          keys.delUserApiKey();
          ini.save(function(err){
            target.message = "Successfully targeted " + tar;
            return cb(err, tar);
          });
        }else {        
          // set username and cookie
          if(null != targ.user && typeof targ.user !== "undefined"){
            ini.set("username", targ.user, "user");
          }
          if(null != targ.cookie && typeof targ.cookie !== "undefined"){
            ini.set("cookie", targ.cookie, "user");
          }
          if(null != targ.domain && typeof targ.domain !== "undefined"){
            ini.set("domain", targ.domain, "user");
          }
          if(null != targ[keys.KEY_ID] && typeof targ[keys.KEY_ID] != "undefined"){
            ini.set(keys.KEY_ID, targ[keys.KEY_ID], "user");
          }
          ini.save(function(err){
            target.message = "Successfully targeted: " + targ.target + (targ.user ? (" User: " + targ.user) : (" API Key: " + targ[keys.KEY_ID]));
            return cb(err, targ);
          });   
        }
      }
    }