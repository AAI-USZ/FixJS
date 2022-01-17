function(dataSource) {
    var title = dataSource.get('title'),
        hint = dataSource.get('hint'),
        hintEnabled = dataSource.get('hintEnabled'),
        escapeHTML = dataSource.get('escapeHTML'),
        icon = dataSource.get('icon') || '';

    // Escape the title of the button if needed. This prevents potential
    // XSS attacks.
    if (title && escapeHTML) {
      title = SC.RenderContext.escapeHTML(title) ;
    }

    if (hintEnabled && hint && !title) {
      if (escapeHTML) hint = SC.RenderContext.escapeHTML(hint);
      title = "<span class='sc-hint'>" + hint + "</span>";
    }

    if (icon) {
      // If the icon property is the path to an image, create an image tag
      // that points to that URL.
      if (icon.indexOf('/') >= 0) {
        icon = '<img src="'+icon+'" alt="" class="icon" />';

      // Otherwise, the icon property is a class name that should be added
      // to the image tag. Display a blank image so that the user can add
      // background image using CSS.
      } else {
        icon = '<img src="'+SC.BLANK_IMAGE_URL+'" alt="" class="icon '+icon+'" />';
      }
    }
    
    return icon + title;
  }