function(messageNode, event) {
    var header = messageNode.message;
    Cards.popupMenuForNode(
      this.buildEditMenuForMessage(header), messageNode,
      ['menu-item'],
      function(clickedNode) {
        if (!clickedNode)
          return;

        switch (clickedNode.classList[0]) {
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
        }
      });
  }