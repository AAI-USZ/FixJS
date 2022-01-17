function(content, opts) {
    var self = this;
    opts = opts || {};

    Tr8n.UI.Translator.hide();
    Tr8n.UI.LanguageSelector.hide();
    Tr8n.Utils.hideFlash();

    this.content_frame.src = 'about:blank';

    this.overlay.style.display  = "block";

    opts["width"] = opts["width"] || 700;
    opts["height"] = opts["height"] || 400;

    this.container.style.width        = opts["width"] + 'px';
    this.container.style.marginLeft   = -opts["width"]/2 + 'px';
    this.resize(opts["height"]);
    this.container.style.display      = "block";

    window.setTimeout(function() {
      var iframe_doc = self.content_frame.contentWindow.document;
      iframe_doc.body.setAttribute('style', 'background-color:white;padding:10px;margin:0px;font-size:10px;font-family:Arial;');

      Tr8n.Utils.insertCSS(Tr8n.host + "/assets/tr8n/tr8n.css", iframe_doc.body);
      Tr8n.Utils.insertScript(Tr8n.host + "/assets/tr8n/tr8n.js", function() {
        self.content_frame.contentWindow.Tr8n.host = Tr8n.host;
        self.content_frame.contentWindow.Tr8n.Logger.object_keys = Tr8n.Logger.object_keys;
        
        var div = document.createElement("div");
        div.innerHTML = content;
        iframe_doc.body.appendChild(div);
      }, iframe_doc.body);

    }, 1);
  }