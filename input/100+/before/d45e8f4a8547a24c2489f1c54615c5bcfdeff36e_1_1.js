function _autoHeight($el, animate) {
    if (DATA.options.autoHeight) {
      var $prevEl = $THIS.find('.smapp-slides');
      if (!DATA.autoHeight) DATA.autoHeight = $prevEl.height();
      var inner = $el.find('.item-inner').height(), outer = $prevEl.height();
      if (inner > outer) {
        animate ? $prevEl.animate({'height': inner}, DATA.options.animateSpeed) : $prevEl.height(inner);
      }
      else if (inner < outer) {
        var newH = Math.max(inner, DATA.autoHeight);
        animate ? $prevEl.animate({'height': newH}, DATA.options.animateSpeed) : $prevEl.height(newH);
      }
    }
  }