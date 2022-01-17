function MailUniverse(testingModeLogData, callAfterBigBang) {
  /** @listof[CompositeAccount] */
  this.accounts = [];
  this._accountsById = {};

  /** @listof[IdentityDef] */
  this.identities = [];
  this._identitiesById = {};

  this._opsByAccount = {};
  this._opCompletionListenersByAccount = {};

  this._bridges = [];

  // hookup network status indication
  var connection = window.navigator.connection ||
                     window.navigator.mozConnection ||
                     window.navigator.webkitConnection;
  this.online = true; // just so we don't cause an offline->online transition
  this._onConnectionChange();
  connection.addEventListener('change', this._onConnectionChange.bind(this));

  this._testModeDisablingLocalOps = false;

  /**
   * @dictof[
   *   @key[AccountId]
   *   @value[@listof[SerializedMutation]]
   * ]{
   *   The list of mutations for the account that still have yet to complete.
   * }
   */
  this._pendingMutationsByAcct = {};

  this.config = null;

  if (testingModeLogData) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("! DEVELOPMENT MODE ACTIVE!                !");
    console.log("! LOGGING SUBSYSTEM ENTRAINING USER DATA! !");
    console.log("! (the data does not leave the browser.)  !");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    $log.DEBUG_markAllFabsUnderTest();
  }

  this._LOG = LOGFAB.MailUniverse(this, null, null);
  this._db = new $imapdb.ImapDB();
  var self = this;
  this._db.getConfig(function(configObj, accountInfos) {
    self._LOG.configLoaded(configObj, accountInfos);
    if (configObj) {
      self.config = configObj;
      for (var i = 0; i < accountInfos.length; i++) {
        var accountInfo = accountInfos[i];
        self._loadAccount(accountInfo.def, accountInfo.folderInfo);
      }
    }
    else {
      self.config = {
        // We need to put the id in here because our startup query can't
        // efficiently get both the key name and the value, just the values.
        id: 'config',
        nextAccountNum: 0,
        nextIdentityNum: 0,
      };
      self._db.saveConfig(self.config);
    }
    callAfterBigBang();
  });
}