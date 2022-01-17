function finish(err, buffer) {
        if (err) { callback(err); return; }
        postProcess({
          "Cache-Control": "public, max-age=3600"
        }, buffer, version, name, this);
      }