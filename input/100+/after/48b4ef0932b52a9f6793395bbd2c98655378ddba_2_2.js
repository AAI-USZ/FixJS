function(editMode) {
    var domNode = this.domNode;
    var normalHeader = domNode.getElementsByClassName('msg-list-header')[0],
        editHeader = domNode.getElementsByClassName('msg-listedit-header')[0],
        normalToolbar =
          domNode.getElementsByClassName('msg-list-action-toolbar')[0],
        editToolbar =
          domNode.getElementsByClassName('msg-listedit-action-toolbar')[0];

    this.editMode = editMode;

    if (editMode) {
      normalHeader.classList.add('collapsed');
      normalToolbar.classList.add('collapsed');
      editHeader.classList.remove('collapsed');
      editToolbar.classList.remove('collapsed');

      this.selectedMessages = [];
      this.selectedMessagesUpdated();
    }
    else {
      normalHeader.classList.remove('collapsed');
      normalToolbar.classList.remove('collapsed');
      editHeader.classList.add('collapsed');
      editToolbar.classList.add('collapsed');

      // (Do this based on the DOM nodes actually present; if the user has been
      // scrolling a lot, this.selectedMessages may contain messages that no
      // longer have a domNode around.)
      var selectedMsgNodes =
        domNode.getElementsByClassName('msg-header-item-selected');
      for (var i = 0; i < selectedMsgNodes.length; i++) {
        selectedMsgNodes[i].classList.remove('msg-header-item-selected');
      }

      this.selectedMessages = null;
    }

    // UXXX do we want to disable the buttons if nothing is selected?
  }