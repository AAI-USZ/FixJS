function(key){
        var match = key.match(/^(([\$\_a-z]|ng\:)[\w\_\-]{2,})/);
        if (match){
          key = match[1];
          if (!keywords[key]) {
            keywords[key] = true;
            words.push(key);
          }
        }
      }