function(parent_node, text_node, label) {
    // we need to handle empty spaces better
    var sanitized_label = Tr8n.Utils.sanitizeString(label);

    if (Tr8n.Utils.isNumber(sanitized_label)) return;

    // no empty strings
    if (sanitized_label == null || sanitized_label.length == 0) return;

    var translated_node = null;
    var translation = this.translate(sanitized_label);

    if (/^\s/.test(label)) translation = " " + translation;
    if (/\s$/.test(label)) translation = translation + " ";

    if (this.inline_translations_enabled) {
      translated_node = document.createElement("span");
      translated_node.innerHTML = translation;
    } else {
      translated_node = document.createTextNode(translation);
    }

    // translated_node.style.border = '1px dotted red';
    parent_node.replaceChild(translated_node, text_node);
  }