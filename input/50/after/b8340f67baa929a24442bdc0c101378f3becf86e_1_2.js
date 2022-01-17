function(reason) {
      console.log("Received reason: %s", reason);
      console.log("Interval Id: %s", intervalId);
      clearInterval(intervalId);
      res("Ignoring SpaceMail");
    }