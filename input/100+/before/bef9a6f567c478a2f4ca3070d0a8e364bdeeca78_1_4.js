function() {
    if (Tr8n.element('tr8n_status_node')) return;

    Tr8n.log("Initializing text nodes...");

    // add node to the document so it is not processed twice
    var tr8nStatusNode = document.createElement('div');
    tr8nStatusNode.id = 'tr8n_status_node';
    tr8nStatusNode.style.display = 'none';
    document.body.appendChild(tr8nStatusNode);

    var text_nodes = [];
    var tree_walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while (tree_walker.nextNode()) {
      text_nodes.push(tree_walker.currentNode);
    }
 
    Tr8n.log("Found " + text_nodes.length + " text nodes");

    var disable_sentences = false;

    for (var i = 0; i < text_nodes.length; i++) {
      var current_node = text_nodes[i];
      var parent_node = current_node.parentNode;
       
      if (!parent_node) continue;

      // no scripts 
      if (parent_node.tagName == "script" || parent_node.tagName == "SCRIPT") continue;
      
      var label = current_node.nodeValue || "";

      // no html image tags
      if (label.indexOf("<img") != -1) continue;

      // we need to handle empty spaces better
      var sanitized_label = Tr8n.Utils.sanitizeString(label);

      if (Tr8n.Utils.isNumber(sanitized_label)) continue;

      // no empty strings
      if (sanitized_label == null || sanitized_label.length == 0) continue;

      // no comments
      // if (arr[i].nodeValue.indexOf("<!-") != -1) continue;

      var sentences = sanitized_label.split(". ");

      if (disable_sentences || sentences.length == 1) {
        var translated_node = document.createElement("span");
        // translated_node.style.border = '1px dotted red';
        translated_node.innerHTML = this.translate(sanitized_label);
        parent_node.replaceChild(translated_node, current_node);
      } else {
        var node_replaced = false;

        for (var i=0; i<sentences.length; i++) {
          var sanitized_sentence = sentences[i];
          if (sanitized_sentence.length == 0) continue;

          sanitized_sentence = Tr8n.Utils.sanitizeString(sanitized_sentence);
          if (sanitized_sentence.length == 0) continue;

          var sanitized_sentence = sanitized_sentence + ".";
          var translated_node = document.createElement("span");
          // translated_node.style.border = '1px dotted green';
          translated_node.innerHTML = this.translate(sanitized_sentence);

          if (node_replaced) {
            parent_node.appendChild(translated_node);
          } else {
            parent_node.replaceChild(translated_node, current_node);
            node_replaced = true;
          }

          var space_node = document.createElement("span");
          // space_node.style.border = '1px dotted yellow';
          space_node.innerHTML = " ";
          parent_node.appendChild(space_node);
        }
      }
    }

    this.submitMissingTranslationKeys();
  }