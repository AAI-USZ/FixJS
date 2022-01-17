function(event) {
      item.id = event.target.result;
      if (callback)
        callback(item);
    }