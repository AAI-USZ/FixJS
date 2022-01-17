function() {
    var self = this;

    Tr8n.Utils.addEvent(document, Tr8n.Utils.isOpera() ? 'click' : 'contextmenu', function(e) {
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