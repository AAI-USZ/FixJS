function(datum) {
      // If the corpus' previous Datum is more than 24 hours old,
      // prompt the user if they want to create a new Session.
      var tooOld = false;
      for (var i = 0; i < this.model.length; i++) {
        var previousDateEntered = this.model.models[i].get("dateEntered")
        if (previousDateEntered) {
          var currentDate = new Date();
          // 86400000 = 24h * 60m * 60s * 1000ms = 1 day 
          if (currentDate - new Date(JSON.parse(previousDateEntered)) > 86400000) {
            tooOld = true;
            break;
          }
        }
      }
      
      if (tooOld && confirm("This session is getting pretty old.\nCreate a new session?")) {
        console.log("new session modal");
      } else {
        // Set the Datum's Session to the current Session
        datum.set("session", app.get("currentSession"));
        
        // Add the new, blank, Datum
        this.model.add(datum, {at:0});
         
        // If there are too many datum on the screen, remove the bottom one and save it.
        if (this.model.length > app.get("authentication").get("userPrivate").get("prefs").get("numVisibleDatum")) {
          var d = this.model.pop();
          console.log("Removed the datum with id: " + d._id);
          d.save();
        }
      }
    }