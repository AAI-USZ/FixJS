function(event)

  {

    if (this.mode != MODE_DEFAULT && this.editor)

      this.editor.submit();

    if (selection)

      selection.removeAllRanges();

    view_container = null;

    view_container_first_child = null;

    nav_target = null;

    selection = null;

    range = null;

    document.removeEventListener('DOMNodeInserted', ondomnodeinserted, false);

  }