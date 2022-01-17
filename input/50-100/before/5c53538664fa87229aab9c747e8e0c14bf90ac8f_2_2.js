function(comment, pos){
      var tags = [];
      var regexp = /@(\S+)([^@]*)/g; // TODO: regexp as string, pull out @ to attribute
      
      while( match = regexp.exec(comment) ){
        tags.push({
          name: match[1],
          value: match[2]
        });
      }
      
      return tags;
    }