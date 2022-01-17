function(key){
        var match = key.match(/^((ng:|[\$_a-z])[\w\-_]+)/);
        if (match){
          key = match[1];
          if (!keywords[key]) {
            keywords[key] = true;
            words.push(key);
          }
        }
      }