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
        replies.shift();
        first = replies.first;
      }
      if (!update) {
        return;
      }
      return Unread.update(replies.length === 0);
    }