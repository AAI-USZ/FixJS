function(msg) {
    var script;
    if (msg.isEnabled != null) {
      if (msg.isEnabled === true) {
        return factMananger.showFact();
      } else {
        return factMananger.hideFact();
      }
    } else if (msg.fact != null) {
      return factMananger.showFact(msg.fact);
    } else if (msg.css != null) {
      script = $('<style type="text/css"></style>');
      script.html(msg.css);
      return $(script).appendTo($('head:first'));
    }
  }