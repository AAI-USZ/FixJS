function() {
    applyManips();
    for (var nOps = undoOps.length; nOps > 0; nOps--) {
      testAccount.eImapAccount.expect_runOp_begin('local_do', 'modtags');
      testAccount.eImapAccount.expect_runOp_end('local_do', 'modtags');
    }
    testAccount.expect_headerChanges(folderView, doHeaderExps, 'roundtrip');
  }