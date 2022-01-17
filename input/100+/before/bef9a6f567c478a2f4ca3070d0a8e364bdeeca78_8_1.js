function(options) {
    var self = this;
    this.options = options;
    this.translation_key_id = null;
    this.suggestion_tokens = null;
    this.container_width = 400;

    this.container                = document.createElement('div');
    this.container.className      = 'tr8n_translator';
    this.container.id             = 'tr8n_translator';
    this.container.style.display  = "none";
    this.container.style.width    = this.container_width + "px";

    this.stem_image = document.createElement('img');
    this.stem_image.src = Tr8n.host + '/assets/tr8n/top_left_stem.png';
    this.container.appendChild(this.stem_image);

    this.content_frame = document.createElement('iframe');
    this.content_frame.src = 'about:blank';
    this.content_frame.style.border = '0px';
    this.container.appendChild(this.content_frame);

    document.body.appendChild(this.container);

    if (window.addEventListener) {  // all browsers except IE before version 9
      window.addEventListener("message", Tr8n.onMessage, false);
    } else {
      if (window.attachEvent) {   // IE before version 9
          window.attachEvent("onmessage", Tr8n.onMessage);
      }
    }

    var event_type = Tr8n.Utils.isOpera() ? 'click' : 'contextmenu';

    Tr8n.Utils.addEvent(document, event_type, function(e) {
      if (Tr8n.Utils.isOpera() && !e.ctrlKey) return;

      var translatable_node = Tr8n.Utils.findElement(e, ".tr8n_translatable");
      var language_case_node = Tr8n.Utils.findElement(e, ".tr8n_language_case");

      var link_node = Tr8n.Utils.findElement(e, "a");

      if (translatable_node == null && language_case_node == null) return;

      // We don't want to trigger links when we right-mouse-click them
      if (link_node) {
        var temp_href = link_node.href;
        var temp_onclick = link_node.onclick;
        link_node.href='javascript:void(0);';
        link_node.onclick = void(0);
        setTimeout(function() { 
          link_node.href = temp_href; 
          link_node.onclick = temp_onclick; 
        }, 500);
      }

      if (e.stop) e.stop();
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();

      if (language_case_node)
        self.show(language_case_node, true);
      else 
        self.show(translatable_node, false);

      return false;
    });
  }