function(node) {

          // Now select the children.
          node.selectChildren(state);
          if (params.selected) {
            params.selected(node, !child);
          }
        }