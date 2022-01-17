function(trackList) {
    // we only memoize the browseList, we don't persist it in storage
    var bank = Tapedeck.Backend.Bank;
    bank.Memory.rememberTrackList(bank.savedBrowseListName, trackList);
  }