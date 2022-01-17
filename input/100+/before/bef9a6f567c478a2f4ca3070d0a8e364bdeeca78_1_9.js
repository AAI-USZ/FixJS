function(url, opts) {
    var self = this;
    opts = opts || {};

    Tr8n.UI.Translator.hide();
    Tr8n.UI.LanguageSelector.hide();
    Tr8n.Utils.hideFlash();

    this.content_frame.src = Tr8n.Utils.toUrl('/tr8n/help/splash_screen', {msg: opts['message'] || 'Loading...'});

    this.overlay.style.display  = "block";

    opts["width"] = opts["width"] || 700;
    var default_height = 100;

    this.container.style.width        = opts["width"] + 'px';
    this.container.style.marginLeft   = -opts["width"]/2 + 'px';
    this.resize(default_height);

    this.container.style.display      = "block";

    window.setTimeout(function() {
      self.content_frame.src = Tr8n.Utils.toUrl(url);
    }, 500);
  }