function() {
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
        // Do not force everything to be under test; leave that to the test
        // framework.  (If we passed true, we would break the testing
        // framework's ability to log things, as well.)
        false,
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
    }