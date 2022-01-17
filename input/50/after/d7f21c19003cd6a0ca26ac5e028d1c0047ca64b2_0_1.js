function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var idx = node.children.length - 1;
        node.deleteArrayItem(idx);
      }