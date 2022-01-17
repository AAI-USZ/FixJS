function() {
      // The expanded info may be partially obscured on mobile devices in
      // landscape mode.  Force the screen size hacks to account for the new
      // expanded size.
      dom.fireEvent(window, "resize");
    }