function(event) {
            node.selectChildren($(event.target).is(':checked'));
            if (params.selected) {
              params.selected({}, true);
            }
          }