function() {
        data.d = JSON.parse(window.JSInterface.getScheduleJson(false));
        // fix timestamps
        for(var i in data.d) {
          data.d[i].timestamp -= (60*60*4);
        }
    }