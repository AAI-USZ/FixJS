function(name, trackList, onChanged) {
      if (typeof(onChanged) == "undefined") {
        onChanged = function(eventName) {
          bank.saveList(bank.trackListPrefix, name, trackList, function() { });
        }
      }
      var bank = Tapedeck.Backend.Bank
      this.trackLists[name] = trackList;

      trackList.bind("all", onChanged);
    }