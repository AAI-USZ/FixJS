function(selector) {
    $("div.tooltip").remove();
    return $("" + selector + " .rel-tooltip").tooltip({
      placement: 'bottom'
    });
  }