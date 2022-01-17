function(ps) {
    var self = this;

    var caption = '';
    if (ps.description || ps.body) {
      caption = joinText([
        ps.description,
        (ps.body) ? '“' + ps.body + '”' : ''
      ], "\n\n", true);
    }
    else {
      caption = ps.item || ps.page;
    }

    var sendContent = {};
    if (ps.file) {
      caption = joinText([
        caption,
        '(via ' + ps.pageUrl + ' )'
      ], "\n\n", true);
      sendContent = {
        details : caption,
        link    : ps.pageUrl,
        img_url : ps.itemUrl,
        img     : ps.file
      };
    }
    else {
      sendContent = {
        details : caption,
        link    : ps.pageUrl,
        img_url : ps.itemUrl
      };
    }

    return (ps.pinboard
      ? succeed([{id : ps.pinboard}])
      : self._getBoards(true))
    .addCallback(function(boards) {
      sendContent.board = boards[0].id;
      return self.getCSRFToken().addCallback(function(csrftoken) {
        sendContent.csrfmiddlewaretoken = csrftoken;
        return request(self.UPLOAD_URL, {
          sendContent : sendContent
        });
      });
    });
  }