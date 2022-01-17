function (err, data) {
      if (err) cb(err);
      else if (data == '') cb(new Error('JSON Syntax Error'));
      else try {
        cb(null, JSON.parse(data));
      } catch (e) {
        console.error('While loading metadata:', e.stack);
      }
    }