function(selector) {
    return $("" + selector + " .rel-tooltip").tooltip({
      placement: 'bottom'
    });
  }