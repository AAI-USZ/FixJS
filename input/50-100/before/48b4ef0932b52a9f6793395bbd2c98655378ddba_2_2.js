function(header) {
    var contents = msgNodes['edit-menu'].cloneNode(true);

    // Remove the elements that are not relevant (versus collapsing because
    // collapsing does not make :last-child work right).
    contents.removeChild(
      contents.getElementsByClassName(
        header.isStarred ? 'msg-edit-menu-star'
                         : 'msg-edit-menu-unstar')[0]);
    contents.removeChild(
      contents.getElementsByClassName(
        header.isRead ? 'msg-edit-menu-mark-read'
                      : 'msg-edit-menu-mark-unread')[0]);

    return contents;
  }