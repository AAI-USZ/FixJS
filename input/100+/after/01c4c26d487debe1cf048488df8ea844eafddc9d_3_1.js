function(scope, elm, attrs) {
    var top = elm.offset().top;
    if (!attrs.uiScrollfix) {
      attrs.uiScrollfix = top;
    } else {
      if (attrs.uiScrollfix.indexOf('-') === 0) {
        attrs.uiScrollfix = top - attrs.uiScrollfix.substr(1);
      } else if (attrs.uiScrollfix.indexOf('+') === 0) {
        attrs.uiScrollfix = top + parseInt(attrs.uiScrollfix.substr(1));
      }
    }
    $(window).bind('scroll.ui-scrollfix', function(){
      if (!elm.hasClass('fixed') && window.pageYOffset > attrs.uiScrollfix) {
        elm.addClass('fixed');
      } else if (elm.hasClass('fixed') && window.pageYOffset < attrs.uiScrollfix) {
        elm.removeClass('fixed');
      }
    });
  }