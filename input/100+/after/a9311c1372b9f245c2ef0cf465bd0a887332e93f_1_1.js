function(state, indirect) {

      // Set the checked state.
      this.checked = state;

      // Make sure the input is checked accordingly.
      this.input.attr('checked', state);

      // If they wish to deep load then do that here.
      if (this.checked && params.deepLoad) {

        // Load all nodes underneath this node.
        this.loadAll(function(node) {

          // Now select the children.
          node.selectChildren(state);
          if (params.selected) {
            params.selected(node, !indirect);
          }
        });
      }
      else {

        // Now select the children.
        this.selectChildren(state);
        if (params.selected) {
          params.selected(this, !indirect);
        }
      }
    }