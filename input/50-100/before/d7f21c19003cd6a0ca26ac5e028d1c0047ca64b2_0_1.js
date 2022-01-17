function (evt) {
        evt.preventDefault();
        var idx = node.children.length;
        node.insertArrayItem(idx, $('#' + escapeSelector(node.id) + ' ul').get(0));
      }