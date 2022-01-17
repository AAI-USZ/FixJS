function(line) {
      var tokens = line.split(/\s+/);
      var key = tokens[0];
    
    if(key == searchKey) {
        callback({status: 'hit', key: key, 'line': line, tokens: tokens});
      } else if(adjustment == 1)  {
        miss(callback);
      } else {      
        adjustment = Math.ceil(adjustment * 0.5);

        if (key < searchKey) {
          findAt(fd, size, pos + adjustment, pos, adjustment, searchKey, callback);
        } else {
          findAt(fd, size, pos - adjustment, pos, adjustment, searchKey, callback);
        }
      }
    }