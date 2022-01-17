function (err, data) {
      if (err) cb(err);
      else if (data == '') cb(new Error('Metadata Syntax Error'));
      else try {
        cb(null, JSON.parse(data));
      } catch (e) {
        cb(e);
      }
    }