function() {
    for (var nOps = undoOps.length; nOps > 0; nOps--) {
      testAccount.eImapAccount.expect_runOp_begin('local_undo', 'modtags');
      testAccount.eImapAccount.expect_runOp_end('local_undo', 'modtags');
    }

    undoOps.forEach(function(x) { x.undo(); });
    testAccount.expect_headerChanges(
      folderView, undoHeaderExps,
      { top: true, bottom: true, grow: false },
      'roundtrip');
  }