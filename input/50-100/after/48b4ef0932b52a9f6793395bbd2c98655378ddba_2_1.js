function(clickedNode) {
        if (!clickedNode)
          return;

        var op = null;
        switch (clickedNode.classList[0]) {
          // All of these mutations are immediately reflected, easily observed
          // and easily undone, so we don't show them as toaster actions.
          case 'msg-edit-menu-star':
            header.setStarred(true);
            break;
          case 'msg-edit-menu-unstar':
            header.setStarred(false);
            break;
          case 'msg-edit-menu-mark-read':
            header.setRead(true);
            break;
          case 'msg-edit-menu-mark-unread':
            header.setRead(false);
            break;

          // Deletion, and moves, on the other hand, require a lot of manual
          // labor, so we need to expose their undo op's.
        }
        if (op)
          Toaster.logMutation(op);
      }