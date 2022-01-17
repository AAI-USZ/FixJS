function(self, opts) {
    self.eUniverse = self.T.actor('MailUniverse', self.__name, null, self);

    var lazyConsole = self.T.lazyLogger('console');

    gConsoleLogFunc = function(msg) {
      lazyConsole.value(msg);
    };

    if (!opts)
      opts = {};

    self.universe = null;
    self.MailAPI = null;

    self._bridgeLog = null;

    // self-registered accounts that belong to this universe
    self.__testAccounts = [];
    // Self-registered accounts that think they are getting restored; we use
    // this to let them hook into the universe bootstrap process when their
    // corresponding loggers will be created.
    self.__restoredAccounts = [];

    self.__folderConnLoggerSoup = {};
    self.__folderStorageLoggerSoup = {};

    // Pick a 'now' for the purposes of our testing that does not change
    // throughout the test.  We really don't want to break because midnight
    // happened during the test run.
    // Of course, we don't want to future-date things and have servers be
    // mad at us either, so let's have yesterday be our current time.  We use
    // our time-warp functionality on the server to make this okay.
    if (!opts.hasOwnProperty('realDate') || opts.realDate === false) {
      self._useDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      self._useDate.setHours(12, 0, 0, 0);
      $imapslice.TEST_LetsDoTheTimewarpAgain(self._useDate);
      var DISABLE_THRESH_USING_FUTURE = -60 * 60 * 1000;
      $imapslice.TEST_adjustSyncValues({
        days: 7,
        refreshNonInbox: DISABLE_THRESH_USING_FUTURE,
        refreshInbox: DISABLE_THRESH_USING_FUTURE,
        oldIsSafeForRefresh: DISABLE_THRESH_USING_FUTURE,
        refreshOld: DISABLE_THRESH_USING_FUTURE,
        useRangeNonInbox: DISABLE_THRESH_USING_FUTURE,
        useRangeInbox: DISABLE_THRESH_USING_FUTURE
      });
    }
    else {
      self._useDate = new Date();
    }

    /**
     * Creates the mail universe, and a bridge, and MailAPI.
     */
    self.T.convenienceSetup(self, 'initializes', self.eUniverse, function() {
      self.__attachToLogger(LOGFAB.testUniverse(self, null, self.__name));
      self._bridgeLog = LOGFAB.bridgeSnoop(self, self._logger, self.__name);

      self.RT.captureAllLoggersByType(
        'ImapFolderConn', self.__folderConnLoggerSoup);
      self.RT.captureAllLoggersByType(
        'ImapFolderStorage', self.__folderStorageLoggerSoup);

      for (var iAcct = 0; iAcct < self.__restoredAccounts.length; iAcct++) {
        var testAccount = self.__restoredAccounts[iAcct];
        testAccount._expect_restore();
      }

      self.expect_createUniverse();

      self.expect_queriesIssued();
      var callbacks = $_allback.allbackMaker(
        ['accounts', 'folders'],
        function gotSlices() {
          self._logger.queriesIssued();
        });

      MailUniverse = self.universe = new $_mailuniverse.MailUniverse(
        function onUniverse() {
          console.log('Universe created');
          var TMB = MailBridge = new $_mailbridge.MailBridge(self.universe);
          var TMA = MailAPI = self.MailAPI = new $_mailapi.MailAPI();
          TMA.__bridgeSend = function(msg) {
            self._bridgeLog.apiSend(msg.type, msg);
            window.setZeroTimeout(function() {
                                    TMB.__receiveMessage(msg);
                                  });
          };
          TMB.__sendMessage = function(msg) {
            self._bridgeLog.bridgeSend(msg.type, msg);
            window.setZeroTimeout(function() {
                                    TMA.__bridgeReceive(msg);
                                  });
          };
          self._logger.createUniverse();


          gAllAccountsSlice = self.allAccountsSlice =
            self.MailAPI.viewAccounts(false);
          gAllAccountsSlice.oncomplete = callbacks.accounts;

          gAllFoldersSlice = self.allFoldersSlice =
            self.MailAPI.viewFolders('navigation');
          gAllFoldersSlice.oncomplete = callbacks.folders;
        });
    });
    self.T.convenienceDeferredCleanup(self, 'cleans up', self.eUniverse,
                                      function() {
      if (self.universe) {
        for (var i = 0; i < self.__testAccounts.length; i++) {
          self.__testAccounts[i].expect_shutdown();
        }
        self.universe.shutdown();
      }
    });
  }