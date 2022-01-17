function(q, id) {
      var board, el, i, inline, isBacklink, path, postID, root, threadID;
      if (q.host === 'boards.4chan.org') {
        path = q.pathname.split('/');
        board = path[1];
        threadID = path[3];
        postID = id;
      } else {
        board = q.dataset.board;
        threadID = 0;
        postID = q.dataset.id;
      }
      el = board === g.BOARD ? $.id("p" + postID) : false;
      inline = $.el('div', {
        id: "i" + postID,
        className: el ? 'inline' : 'inline crosspost'
      });
      root = (isBacklink = /\bbacklink\b/.test(q.className)) ? q.parentNode : $.x('ancestor-or-self::*[parent::blockquote][1]', q);
      $.after(root, inline);
      Get.post(board, threadID, postID, inline);
      if (!el) {
        return;
      }
      if (isBacklink && Conf['Forward Hiding']) {
        $.addClass(el.parentNode, 'forwarded');
        ++el.dataset.forwarded || (el.dataset.forwarded = 1);
      }
      if ((i = Unread.replies.indexOf(el)) !== -1) {
        Unread.replies.splice(i, 1);
        return Unread.update(true);
      }
    }