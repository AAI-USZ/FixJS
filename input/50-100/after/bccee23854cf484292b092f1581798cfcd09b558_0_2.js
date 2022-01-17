function(evt) {
    /* ignore enter, space bar, arrow keys */
    if(_.include([KEYCODES.RETURN, KEYCODES.SPACE, KEYCODES.LEFT,
                  KEYCODES.UP, KEYCODES.RIGHT, KEYCODES.DOWN], evt.keyCode) ||
        this.modifierPressed(evt) ) { return }

    this.interactionsView.invokePane();
    $('#new-post-comment textarea').focus();
  }