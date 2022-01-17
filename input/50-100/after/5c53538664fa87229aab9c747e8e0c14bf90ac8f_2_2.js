function(comment, pos){
      var tags = [];
      var regexp = /@(\S+)([^@]*)/g; // TODO: regexp as string, pull out @ to attribute
      
      while( match = regexp.exec(comment) ){
        var val = match[2];
        
        tags.push({
          name: match[1],
          value: val.replace(/\\@/g, '@')
        });
      }
      
      return tags;
    }