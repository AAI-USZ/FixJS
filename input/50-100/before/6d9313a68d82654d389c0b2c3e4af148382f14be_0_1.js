function(key){
        var match = key.match(/^(([\$\_a-z]|ng\:)[\w\_\-]+)/);
        if (match){
          key = match[1];
          if (!keywords[key]) {
            keywords[key] = true;
            words.push(key);
          }
        }
      }