function(err, result) {
      if (err)  {
        console.warn("Failed connecting to FitBit. Clearing session.", err);
        fitbit.logout(req);
      } else {
        res.send("OK")
      }
      
    }