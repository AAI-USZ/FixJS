function() {
    // - expectations
    var toStar = folderView3.slice.items[0];
    testAccount3.eImapAccount.expect_runOp_begin('local_do', 'modtags');
    testAccount3.eImapAccount.expect_runOp_end('local_do', 'modtags');
    testAccount3.eImapAccount.expect_runOp_begin('do', 'modtags');
    testAccount3.eImapAccount.expect_runOp_end('do', 'modtags');
    eSync.expect_event('ops-done');

    doHeaderExps = {
      changes: [
        [toStar, 'isStarred', true],
      ],
      deletions: [],
    };
    undoHeaderExps = {
      changes: [
        [toStar, 'isStarred', false],
      ],
      deletions: [],
    };

    // - do it!
    undoOps = [toStar.setStarred(true)];

    testAccount3.expect_headerChanges(
      folderView3, doHeaderExps,
      { top: true, bottom: true, grow: false },
      'roundtrip');
    // We need to roundtrip before waiting on the ops because the latter does
    // not cross the bridge itself.
    MailAPI.ping(function() {
      MailUniverse.waitForAccountOps(MailUniverse.accounts[0], function() {
        eSync.event('ops-done');
      });
    });
  }