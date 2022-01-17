function(historyEntry) {
      this.element.innerHTML = "";
      
      while (historyEntry.firstChild) {
        this.element.appendChild(historyEntry.firstChild);
      }
      
      // Restore selection
      var offset,
          node,
          position;
      
      if (historyEntry.hasAttribute(DATA_ATTR_OFFSET)) {
        offset    = historyEntry.getAttribute(DATA_ATTR_OFFSET);
        position  = historyEntry.getAttribute(DATA_ATTR_NODE);
        node      = this.element;
      } else {
        node      = this.element.querySelector("[" + DATA_ATTR_OFFSET + "]") || this.element;
        offset    = node.getAttribute(DATA_ATTR_OFFSET);
        position  = node.getAttribute(DATA_ATTR_NODE);
        node.removeAttribute(DATA_ATTR_OFFSET);
        node.removeAttribute(DATA_ATTR_NODE);
      }
      
      if (position !== null) {
        node = this.getChildNodeByIndex(node, +position);
      }
      
      this.composer.selection.set(node, offset);
    }