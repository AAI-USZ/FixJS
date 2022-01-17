function(html) {
      var bs, doc, err, msg, persona, postID, reply, threadID, _, _ref;
      doc = d.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      if (doc.title === '4chan - Banned') {
        bs = $$('b', doc);
        err = $.el('span', {
          innerHTML: /^You were issued a warning/.test($('.boxcontent', doc).textContent.trim()) ? "You were issued a warning on " + bs[0].innerHTML + " as " + bs[3].innerHTML + ".<br>Warning reason: " + bs[1].innerHTML : "You are banned! ;_;<br>Please click <a href=//www.4chan.org/banned target=_blank>HERE</a> to see the reason."
        });
      } else if (msg = doc.getElementById('errmsg')) {
        err = msg.textContent;
        if (msg.firstChild.tagName) {
          err = msg.firstChild;
          err.target = '_blank';
        }
      } else if (!(msg = $('b', doc))) {
        err = 'Connection error with sys.4chan.org.';
      }
      if (err) {
        if (/captcha|verification/i.test(err) || err === 'Connection error with sys.4chan.org.') {
          QR.cooldown.auto = !!$.get('captchas', []).length;
          QR.cooldown.set(2);
        } else {
          QR.cooldown.auto = false;
        }
        QR.status();
        QR.error(err);
        return;
      }
      reply = QR.replies[0];
      persona = $.get('QR.persona', {});
      persona = {
        name: reply.name,
        email: /^sage$/.test(reply.email) ? persona.email : reply.email,
        sub: Conf['Remember Subject'] ? reply.sub : null
      };
      $.set('QR.persona', persona);
      _ref = msg.lastChild.textContent.match(/thread:(\d+),no:(\d+)/), _ = _ref[0], threadID = _ref[1], postID = _ref[2];
      $.event(QR.el, new CustomEvent('QRPostSuccessful', {
        bubbles: true,
        detail: {
          threadID: threadID,
          postID: postID
        }
      }));
      if (threadID === '0') {
        location.pathname = "/" + g.BOARD + "/res/" + postID;
      } else {
        QR.cooldown.auto = QR.replies.length > 1;
        QR.cooldown.set(/sage/i.test(reply.email) ? 60 : 30);
        if (Conf['Open Reply in New Tab'] && !g.REPLY && !QR.cooldown.auto) {
          $.open("//boards.4chan.org/" + g.BOARD + "/res/" + threadID + "#p" + postID);
        }
      }
      if (Conf['Persistent QR'] || QR.cooldown.auto) {
        reply.rm();
      } else {
        QR.close();
      }
      QR.status();
      return QR.resetFileInput();
    }