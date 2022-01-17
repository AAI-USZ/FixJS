function(playlist) {
    var bank = Tapedeck.Backend.Bank;

    if (bank.isSyncOn()) {
      bank.clearList(bank.playlistPrefix, playlist.id)
    }
    else {
      try {
        var key = bank.playlistPrefix + playlist.id;
        bank.localStorage.removeItem(key);
      }
      catch (error) {
        console.error("Could not remove playlist '" + playlist.id + "'");
      }
    }
    Tapedeck.Backend.MessageHandler.updateView("PlaylistList");
  }