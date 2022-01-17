function cv_pickContact() {
    // going back to the list first
    ThreadUI.close();
    try {
      var activity  = new MozActivity({
        name: "pick",
        data: {
          type: "webcontacts/contact"
        }
      });
      activity.onsuccess = function() {
        var number = this.result.number;
        navigator.mozApps.getSelf().onsuccess = function getSelfCB(evt) {
          if (number) {
            var app = evt.target.result;
            app.launch();
            window.location.hash = '#num=' + number;
          }
        };
        console.log("onsuccess: " + JSON.stringify(this.result));
      }
    } catch (e) {
      console.log('WebActivities unavailable? : ' + e);
    }
  }