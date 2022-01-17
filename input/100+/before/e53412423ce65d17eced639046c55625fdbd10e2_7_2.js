function(testFolder, expectedValues) {
    this.RT.reportActiveActorThisStep(this.eImapAccount);
    this.RT.reportActiveActorThisStep(testFolder.connActor);
    if (!Array.isArray(expectedValues))
      expectedValues = [expectedValues];

    var totalMessageCount = 0;
    for (var i = 0; i < expectedValues.length; i++) {
      var einfo = expectedValues[i];
      totalMessageCount += einfo.count;
      if (this.universe.online) {
        testFolder.connActor.expect_syncDateRange_begin(null, null, null);
        testFolder.connActor.expect_syncDateRange_end(
          einfo.full, einfo.flags, einfo.deleted);
      }
    }
    if (this.universe.online) {
      this.eImapAccount.expect_saveAccountState_begin();
      this.eImapAccount.expect_saveAccountState_end();
    }

    return totalMessageCount;
  }