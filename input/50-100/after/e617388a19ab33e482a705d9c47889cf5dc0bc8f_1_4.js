function(ps) {
      chrome.extension.sendMessage(TBRL.id, {
        request: "search",
        show   : false,
        content: update({
          page    : ctx.title,
          pageUrl : ctx.href
        }, ps)
      }, function(res){ });
    }