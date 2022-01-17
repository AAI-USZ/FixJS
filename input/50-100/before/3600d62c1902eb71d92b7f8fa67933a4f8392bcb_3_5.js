function() {
    for (var nOps = undoOps.length; nOps > 0; nOps--) {
      testAccount2.eImapAccount.expect_runOp_begin('local_undo', 'modtags');
      testAccount2.eImapAccount.expect_runOp_end('local_undo', 'modtags');
    }

    // NB: our undoOps did not usefully survive the restart; they are still
    // hooked up to the old universe/bridge, and so are not useful.  However,
    // their longterm identifiers are still valid, so we can just directly
    // issue the undo requests against the universe.  (If we issued new
    // mutations without restarting, we could have those be alive and use them,
    // but we don't need coverage for that.
    undoOps.forEach(function(x) {
      MailUniverse.undoMutation(x._longtermIds);
    });
    testAccount2.expect_headerChanges(folderView2, undoHeaderExps, 'roundtrip');
  }