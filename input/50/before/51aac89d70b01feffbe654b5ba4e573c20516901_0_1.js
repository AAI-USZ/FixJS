function (e) {
        if (/^(input|textarea)$/i.test(e.target.nodeName) || e.target.isContentEditable) {
          if (e.keyCode === 13) {
            sendText();
          }
          return;
        }
      }