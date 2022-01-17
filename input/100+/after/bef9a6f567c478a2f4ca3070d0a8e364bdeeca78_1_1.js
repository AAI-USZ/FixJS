function(opts, cb) {
    opts || (opts = {});
    this.app_id     = opts.app_id;
    this.logging    = (window.location.toString().indexOf('debug=1') > 0)  || opts.logging || this.logging;
    this.cookies    = opts.cookies  || this.cookies;
    this.host       = opts.host     || this.host;

    Tr8n.log("Initializing Tr8n...");

    if (window.addEventListener) {  // all browsers except IE before version 9
      window.addEventListener("message", Tr8n.onMessage, false);
    } else {
      if (window.attachEvent) {   // IE before version 9
          window.attachEvent("onmessage", Tr8n.onMessage);
      }
    }

    Tr8n.UI.Translator.init();

    Tr8n.Utils.addEvent(document, "keyup", function(event) {
      if (event.keyCode == 27) { // Capture Esc key
        Tr8n.UI.Translator.hide();
        Tr8n.UI.LanguageSelector.hide();
        Tr8n.UI.Lightbox.hide();
      }
    });

    return this;
  }