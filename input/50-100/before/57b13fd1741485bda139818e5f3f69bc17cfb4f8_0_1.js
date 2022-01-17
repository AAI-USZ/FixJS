function(is_start, node) {
        if (! is_start) {
          // when leaving a node, force-clean its children
          for(var n = node.firstChild; n; n = n.nextSibling) {
            Meteor.ui._LiveRange._clean_node(this.tag, n, true);
          }
        }
      }