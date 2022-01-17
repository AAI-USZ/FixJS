function(err, getUserResult) {
      var result = {success: true};
      if (err || !getUserResult || !getUserResult.user) {
        result.success = false;
        result.err = err || "No user found.";
      } else {
        result.user = getUserResult.user;          
      }
      args.result.eventArgs = result;
      args.client.json.send(args.result);          
    }