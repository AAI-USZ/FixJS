function() {
    testAccount3.eImapAccount.expect_runOp_begin('local_undo', 'modtags');
    testAccount3.eImapAccount.expect_runOp_end('local_undo', 'modtags');
    testAccount3.eImapAccount.expect_runOp_begin('undo', 'modtags');
    testAccount3.eImapAccount.expect_runOp_end('undo', 'modtags');
    eSync.expect_event('ops-done');

    undoOps[0].undo();
    testAccount3.expect_headerChanges(
      folderView3, undoHeaderExps,
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