function() {
        var count, doc, id, lastPost, nodes, reply, scroll, _i, _len, _ref;
        if (this.status === 404) {
          Updater.timer.textContent = '';
          Updater.count.textContent = 404;
          Updater.count.className = 'warning';
          clearTimeout(Updater.timeoutID);
          g.dead = true;
          if (Conf['Unread Count']) {
            Unread.title = Unread.title.match(/^.+-/)[0] + ' 404';
          } else {
            d.title = d.title.match(/^.+-/)[0] + ' 404';
          }
          Unread.update(true);
          QR.abort();
          return;
        }
        if (this.status !== 200 && this.status !== 304) {
          Updater.retryCoef += 10 * (Updater.retryCoef < 120);
          if (Conf['Verbose']) {
            Updater.count.textContent = this.statusText;
            Updater.count.className = 'warning';
          }
          return;
        }
        Updater.retryCoef = 10;
        Updater.timer.textContent = "-" + Conf['Interval'];
        /*
              Status Code 304: Not modified
              By sending the `If-Modified-Since` header we get a proper status code, and no response.
              This saves bandwidth for both the user and the servers, avoid unnecessary computation,
              and won't load images and scripts when parsing the response.
        */

        if (this.status === 304) {
          if (Conf['Verbose']) {
            Updater.count.textContent = '+0';
            Updater.count.className = null;
          }
          return;
        }
        Updater.lastModified = this.getResponseHeader('Last-Modified');
        doc = d.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = this.response;
        lastPost = Updater.lastPost;
        id = lastPost.id.slice(2);
        nodes = [];
        _ref = $$('.replyContainer', doc).reverse();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          reply = _ref[_i];
          if (reply.id.slice(2) <= id) {
            break;
          }
          nodes.push(reply);
        }
        count = nodes.length;
        scroll = Conf['Scrolling'] && Updater.scrollBG() && count && lastPost.getBoundingClientRect().bottom - d.documentElement.clientHeight < 25;
        if (Conf['Verbose']) {
          Updater.count.textContent = "+" + count;
          Updater.count.className = count ? 'new' : null;
        }
        if (lastPost = nodes[0]) {
          Updater.lastPost = lastPost;
        }
        $.add(Updater.thread, nodes.reverse());
        if (scroll) {
          return nodes[0].scrollIntoView();
        }
      }