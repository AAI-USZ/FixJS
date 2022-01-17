function() {
      if (self.universe.online) {
        self.RT.reportActiveActorThisStep(self.eImapAccount);
        // Turn on set matching since connection reuse and account saving are
        // not strongly ordered, nor do they need to be.
        self.eImapAccount.expectUseSetMatching();
        self._expect_connection();
        if (!_saveToThing)
          self.eImapAccount.expect_releaseConnection();
      }

      // generate expectations for each date sync range
      var totalExpected = self._expect_dateSyncs(testFolder, expectedValues);
      // Generate overall count expectation and first and last message
      // expectations by subject.
      self.expect_messagesReported(totalExpected);
      if (totalExpected) {
        self.expect_messageSubject(
          0, testFolder.messages[0].headerInfo.subject);
        self.expect_messageSubject(
          totalExpected - 1,
          testFolder.messages[totalExpected - 1].headerInfo.subject);
      }

      var slice = self.MailAPI.viewFolderMessages(testFolder.mailFolder);
      slice.oncomplete = function() {
        self._logger.messagesReported(slice.items.length);
        if (totalExpected) {
          self._logger.messageSubject(0, slice.items[0].subject);
          self._logger.messageSubject(
            totalExpected - 1, slice.items[totalExpected - 1].subject);
        }
        if (_saveToThing) {
          _saveToThing.slice = slice;
        }
        else {
          slice.die();
        }
      };
    }