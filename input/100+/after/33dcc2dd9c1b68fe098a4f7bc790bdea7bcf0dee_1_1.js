function(data, nodeTypeOverride) {
      var text = new Node();
      text.nodeType = (nodeTypeOverride ? nodeTypeOverride : Node.TEXT_NODE);
      text.ownerDocument = node;
      text.nodeValue = data;
      Object.defineProperty(text, "data", {
        get: function() { return this.nodeValue; },
        set: function(value) { this.nodeValue = value; },
        enumerable: true
      });

      text.data = data;
      text.length = data.length;
      text.appendData = function(arg) {
        this.nodeValue += arg;
      };

      Object.defineProperty(text, "textContent", {
        get: function() { return this.nodeValue; },
        enumerable: true
      });
      // TODO appendData, substringData, etc.
      return text;
    }