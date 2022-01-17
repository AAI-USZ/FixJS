function eachRegexp(tags, callback){
        var i, item,
        items = {
          b: [/<(?:b|strong)>((.|[\r\n])*?)<\/(?:b|strong)>/gi,'*'],
          i: [ /<(?:i|em)>((.|[\r\n])*?)<\/(?:i|em)>/gi, '_'],
          del: [ /<(?:strike|del)>((.|[\r\n])*?)<\/(?:strike|del)>/gi, '-'],
          u: [ /<(?:u|ins)>((.|[\r\n])*?)<\/(?:u|ins)>/gi, '+']
        };
        for(i = tags.length; i; i--){
          item = items[tags[i-1]];
          callback(item[0], item[1]);
        }
      }