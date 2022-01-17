function(selector) {
    selector.find("div.tooltip").remove();
    return selector.find(".rel-tooltip").tooltip({
      placement: 'bottom'
    });
  }