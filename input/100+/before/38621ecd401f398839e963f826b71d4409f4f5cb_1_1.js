function(err, getUserResult) {
      var result = {success: true};
      if (err || !getUserResult || !getUserResult.user) {
        result.success = false;
        result.err = err || "No user found.";
        logger.trace("user err: " + result.err);
      } else {
        result.user = getUserResult.user;
        logger.trace("user: " + util.inspect(getUserResult));            
      }
      args.result.eventArgs = result;
      args.client.json.send(args.result);          
    }