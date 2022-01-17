function(continueInit) {
    this.localStorage = window.localStorage;

    this.trackListPrefix = this.bankPrefix + this.trackListPrefix;
    this.playlistPrefix = this.trackListPrefix + this.playlistPrefix;
    this.splitListContinuePrefix = this.bankPrefix + this.splitListContinuePrefix;
    this.currentCassetteKey = this.bankPrefix + this.currentCassetteKey;
    this.cassettePagePrefix = this.bankPrefix + this.cassettePagePrefix;
    this.repeatKey = this.bankPrefix + this.repeatKey;
    this.syncKey = this.bankPrefix + this.syncKey;
    this.blockKey = this.bankPrefix + this.blockKey;
    this.lastSyncWarningKey = this.bankPrefix + this.lastSyncWarningKey;
    if (this.localStorage.getItem(this.repeatKey) == null) {
      this.localStorage.setItem(this.repeatKey, "true");
    }
    if (this.localStorage.getItem(this.syncKey) == null) {
      this.localStorage.setItem(this.syncKey, "off");
    }
    // initialize the block list if necessary
    if (this.localStorage.getItem(this.blockKey) == null) {
      this.saveBlockList(this.defaultBlockPatterns);
    }

    chrome.storage.onChanged.addListener(this.storageChangeListener);

    this.Memory.init();
    this.FileSystem.init(function() {
      Tapedeck.Backend.Bank.preparePlaylistList(function() {
        // Attach events to ensure the browseList is updated and saved properly.
        // Kind of wish there was a better place to do this.
        Tapedeck.Backend.Bank.getBrowseList(function(browseList) {
          browseList.bind("change tracks", function() {
            Tapedeck.Backend.MessageHandler.pushBrowseTrackList(this);
          })

          continueInit();
        });
      });
    });
  }