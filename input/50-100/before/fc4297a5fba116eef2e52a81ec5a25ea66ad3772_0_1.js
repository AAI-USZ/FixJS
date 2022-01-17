function(id)
  {
    this.removeChildrenFromNode($('RB_window'));
    this.moveChildren($(id), $('RB_window'));
    this.activateRBWindow();
  }