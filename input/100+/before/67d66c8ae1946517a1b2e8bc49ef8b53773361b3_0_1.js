function () {
      callback({
        view:   msg.view || match.meta,
        layout: msg.layout,
        locals: msg.data,
        title:  msg.data.head.title,
        route:  msg.data.head.route || match.meta,
        anchor: anchor
      }, null, href);
      }