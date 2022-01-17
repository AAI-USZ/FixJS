function codifyElement(obj) {
    var parent_node = obj.parent();

    var html = obj.clone()
              .wrap('<p>')
              .parent()
              .html()
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

    var code = $("<code></code>");
    code.append(html);

    var pre = $("<pre></pre>");
    pre.append(code);

    parent_node.append(pre);

    return obj;
  }