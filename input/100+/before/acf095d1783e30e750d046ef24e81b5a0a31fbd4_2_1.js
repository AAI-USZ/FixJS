function(value, key){
    count ++;
    forEach(value, function(value, key){
      if (value.$element) {
        dump('LEAK', key, value.$id, sortedHtml(value.$element));
      } else {
        dump('LEAK', key, toJson(value));
      }
    });
  }