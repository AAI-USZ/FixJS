function() {
  "use strict";

  var bid = BrowserID,
      dom = BrowserID.DOM,
      renderer = bid.Renderer,
      BODY = "body";

  function Screen(target, className) {
    return {
      show: function(template, vars) {
        renderer.render(target + " .contents", template, vars);
        dom.addClass(BODY, className);
        dom.fireEvent(window, "resize");
        this.visible = true;
      },

      hide: function() {
        dom.removeClass(BODY, className);
        dom.fireEvent(window, "resize");
        this.visible = false;
      }
    }
  }


  return {
    form: new Screen("#formWrap", "form"),
    wait: new Screen("#wait", "waiting"),
    error: new Screen("#error", "error"),
    delay: new Screen("#delay", "delay")
  };
}