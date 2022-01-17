function() {
      var bottom, first, height, replies, update;
      height = d.documentElement.clientHeight;
      replies = Unread.replies;
      first = replies.first;
      update = false;
      while (first) {
        bottom = first.el.getBoundingClientRect().bottom;
        if (bottom > height) {
          break;
        }
        update = true;
        first = replies.shift();
      }
      if (!update) {
        return;
      }
      return Unread.update(replies.length === 0);
    }