function (text) {
      return '<![CDATA[' + String(text).replace(/\]\]>/g, ']]]]><![CDATA[>') + ']]>';
    }