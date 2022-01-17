function (err, data) {
    if (err) {
      post.emit('error', err);
    } else {
      var heading = data.match(HEADING_RX);
      if (!heading) {
        post.emit('error', 'Missing <h1> in ' + path);
        return;
      }

      post.heading = heading[1];
      post.content = data.match(CONTENT_RX)[1];
      post.perex = post.content.match(PEREX_RX)[1];

      fs.stat(file_path, function (err, stat) {
        post.created_at = stat.ctime;
        post.emit('ready');
      });
    }
  }