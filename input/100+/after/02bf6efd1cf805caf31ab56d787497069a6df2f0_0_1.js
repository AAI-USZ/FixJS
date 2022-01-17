function(id, el) {
      var clone, node, post, _i, _len, _ref;
      clone = $.el('div', {
        className: 'postContainer inline',
        id: "i_pc" + id
      });
      post = el.cloneNode(true);
      post.hidden = false;
      $.add(clone, post);
      _ref = $$('[id]', clone);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.id = "i_" + node.id;
      }
      return clone;
    }