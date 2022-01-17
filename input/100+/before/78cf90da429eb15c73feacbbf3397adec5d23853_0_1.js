function(node, must_open_parents) {
      var parent;
      if (this.options.selectable) {
        if (this.selected_node) {
          this._getNodeElementForNode(this.selected_node).deselect();
        }
        if (node) {
          this._getNodeElementForNode(node).select();
          this.selected_node = node;
          if (must_open_parents) {
            parent = this.selected_node.parent;
            while (parent) {
              if (!parent.is_open) {
                this.openNode(parent, true);
              }
              parent = parent.parent;
            }
          }
        }
        if (this.options.saveState) {
          return this._saveState();
        }
      }
    }