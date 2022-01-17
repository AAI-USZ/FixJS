function MailUniverse(callAfterBigBang) {
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
  this._logReaper = null;
  this._logBacklog = null;

  this._LOG = null;
  this._db = new $imapdb.ImapDB();
  var self = this;
  this._db.getConfig(function(configObj, accountInfos) {
    if (configObj) {
      self.config = configObj;
      if (self.config.debugLogging) {
        console.warn("GENERAL LOGGING ENABLED!");
        console.warn("(CIRCULAR EVENT LOGGING WITH NON-SENSITIVE DATA)");
        $log.enableGeneralLogging();
      }
      self._LOG = LOGFAB.MailUniverse(this, null, null);
      if (self.config.debugLogging)
        self._enableCircularLogging();

      self._LOG.configLoaded(self.config, accountInfos);

      for (var i = 0; i < accountInfos.length; i++) {
        var accountInfo = accountInfos[i];
        self._loadAccount(accountInfo.def, accountInfo.folderInfo);
      }
    }
    else {
      self._LOG = LOGFAB.MailUniverse(this, null, null);
      self.config = {
        // We need to put the id in here because our startup query can't
        // efficiently get both the key name and the value, just the values.
        id: 'config',
        nextAccountNum: 0,
        nextIdentityNum: 0,
        debugLogging: false,
      };
      self._db.saveConfig(self.config);
    }
    callAfterBigBang();
  });
}