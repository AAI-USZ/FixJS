function(browseList){
      var origLen = browseList.length;

      // make sure there isn't already this track in the list
      var existingURLs = browseList.pluck("url");
      for (var i in newTracks) {
        var track = newTracks[i];

        if (jQuery.inArray(track.url, existingURLs) == -1) {
          browseList.add(track);
        }
      }

      if (browseList.length > origLen) {
        Tapedeck.Backend.Bank.saveBrowseList(browseList);
      }
      Tapedeck.Backend.MessageHandler.pushBrowseTrackList(browseList, tab);
    }