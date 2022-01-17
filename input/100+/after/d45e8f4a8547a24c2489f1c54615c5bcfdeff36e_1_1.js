function _autoHeight($el, animate) {
    if (DATA.options.autoHeight) {
      var $slide = $THIS.find('.smapp-show');
      if (!DATA.autoHeight) DATA.autoHeight = $slide.height();
      var inner = $el.find('.slide-inner').height(), outer = $slide.height();
      if (inner > outer) {
        animate ? $slide.animate({'height': inner}, DATA.options.animateSpeed) : $slide.height(inner);
      }
      else if (inner < outer) {
        var newH = Math.max(inner, DATA.autoHeight);
        animate ? $slide.animate({'height': newH}, DATA.options.animateSpeed) : $slide.height(newH);
      }
    }
  }