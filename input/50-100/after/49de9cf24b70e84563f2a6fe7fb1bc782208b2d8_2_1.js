function codifyElement(obj) {
    var parent_node = obj.parent();

    var html = obj.html()
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

    var code = $("<code></code>");
    code.append(html);

    var pre = $("<pre></pre>");
    pre.append(code);

    obj.append(pre);

    return obj;
  }