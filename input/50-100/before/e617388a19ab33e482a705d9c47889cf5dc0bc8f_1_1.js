function(ps) {
      chrome.extension.sendRequest(TBRL.id, {
        request: "share",
        show   : show,
        content: checkHttps(update({
          page    : ctx.title,
          pageUrl : ctx.href
        }, ps))
      }, function(res){ });
    }