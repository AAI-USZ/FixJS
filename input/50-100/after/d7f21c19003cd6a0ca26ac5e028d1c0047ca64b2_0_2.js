function (evt) {
        var idx = node.children.length;
        evt.preventDefault();
        evt.stopPropagation();
        node.insertArrayItem(idx,
          $('.tab-content', $('#' + escapeSelector(node.id))).get(0));
        updateTabs(idx);
      }