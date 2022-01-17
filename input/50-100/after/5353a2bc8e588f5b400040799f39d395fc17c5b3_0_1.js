function(event) {
      var $children = $(this).closest("li").slideUp().parents("ul").children(":hidden").slideDown();

      // if they are using the keyboard to navigate (they hit enter on the link instead of actually
      // clicking it) then put focus on the first of the now-visible items--otherwise, since the
      // .more_link is hidden, focus would be completely lost and leave a blind person stranded.
      // don't want to set focus if came from a mouse click because then you'd have 2 of the tooltip
      // bubbles staying visible, see #9211
      if (event.screenX === 0) {
        $children.first().find(":tabbable:first").focus();
      }
      return false;
    }