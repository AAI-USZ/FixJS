function(e, r, b) {
        if (e != null) {
          return res.end('DB Not Found.');
        }
        return render(b, function(err, html) {
          return res.end(html);
        });
      }