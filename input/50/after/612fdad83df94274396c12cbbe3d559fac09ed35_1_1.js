function(err, data) {
      if (err) throw err;
      // console.log('[done] Read index file from cache: '+ filename);
      callback && callback(undefined, data);
    }