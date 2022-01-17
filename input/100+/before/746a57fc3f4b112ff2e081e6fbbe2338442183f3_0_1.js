function(index, animate) {
      if (DATA.frozen) return;
      if (!methods.get(index)) return;

      // slide out the old, in the new preview
      if (animate) {
        if (DATA.index !== null) _slideOut(DATA.items[DATA.index].$slide, (index > DATA.index));
        _slideIn(DATA.items[index].$slide, (index > DATA.index));
      }
      else {
        if (DATA.index !== null) DATA.items[DATA.index].$slide.removeClass('active');
        DATA.items[index].$slide.addClass('active');
        _autoHeight(DATA.items[0].slide, false);
      }

      // open new popup and update stored index
      _showPopup(DATA.items[index], animate);
      DATA.index = index;
      _refreshControls();
    }