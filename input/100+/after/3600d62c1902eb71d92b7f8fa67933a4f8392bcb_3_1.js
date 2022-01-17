function() {
    // by mentioning testAccount we ensure that we will assert if we see a
    // reuseConnection from it.
    var headers = folderView.slice.items,
        toMarkRead = headers[1],
        toStar = headers[2],
        toMarkRepliedTo = headers[3],
        toMarkForwarded = headers[4],
        toMarkJunk = headers[5],
        toStarAndMarkRead = headers[6];

    applyManips = function applyManips() {
      undoOps = [];

      undoOps.push(toMarkRead.setRead(true));
      undoOps.push(toStar.setStarred(true));
      // these should normally only set by the composition mechanism on send:
      undoOps.push(toMarkRepliedTo.modifyTags(['\\Answered']));
      undoOps.push(toMarkForwarded.modifyTags(['$Forwarded']));
      // This may end up with a custom move-heuristic if it gets better supported
      undoOps.push(toMarkJunk.modifyTags(['$Junk']));
      // this normally would not be a single transaction...
      undoOps.push(toStarAndMarkRead.modifyTags(['\\Seen', '\\Flagged']));
    };
    applyManips();
    for (var nOps = undoOps.length; nOps > 0; nOps--) {
      testAccount.eImapAccount.expect_runOp_begin('local_do', 'modtags');
      testAccount.eImapAccount.expect_runOp_end('local_do', 'modtags');
    }

    doHeaderExps = {
      changes: [
        [toStar, 'isStarred', true],
        [toMarkRead, 'isRead', true],
        [toMarkRepliedTo, 'isRepliedTo', true],
        [toMarkForwarded, 'isForwarded', true],
        [toMarkJunk, 'isJunk', true],
        [toStarAndMarkRead, 'isStarred', true, 'isRead', true],
      ],
      deletions: []
    };
    undoHeaderExps = {
      changes: [
        [toStar, 'isStarred', false],
        [toMarkRead, 'isRead', false],
        [toMarkRepliedTo, 'isRepliedTo', false],
        [toMarkForwarded, 'isForwarded', false],
        [toMarkJunk, 'isJunk', false],
        [toStarAndMarkRead, 'isStarred', false, 'isRead', false],
      ],
      deletions: []
    };
    testAccount.expect_headerChanges(
      folderView, doHeaderExps,
      { top: true, bottom: true, grow: false },
      'roundtrip');
  }