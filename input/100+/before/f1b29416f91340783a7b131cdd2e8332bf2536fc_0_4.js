function(playlist) {
    var bank = Tapedeck.Backend.Bank;

    bank.saveList(bank.playlistPrefix, playlist.id, playlist, function(){
      Tapedeck.Backend.MessageHandler.updateView("PlaylistList");
    });
  }