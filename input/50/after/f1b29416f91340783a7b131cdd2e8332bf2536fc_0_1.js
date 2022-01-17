function (eventName) {
      // we only care about the greater 'change' event.  The "change:__" events are ignored.
      if (eventName.indexOf("change:") == -1) {

        // Force the browselist to be updated outside of the normal self-populated path.
        // That path will generate a new browselist, blowing away this change before we can show it.
        Tapedeck.Backend.MessageHandler.pushBrowseTrackList(trackList);
      }
    }