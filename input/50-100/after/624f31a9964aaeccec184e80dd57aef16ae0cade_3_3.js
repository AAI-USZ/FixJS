function eachRegexp(tags, callback){
        var i, item,
        items = {
          b: [/(\s*)<(?:b|strong)>((?:.|[\r\n])*?)<\/(?:b|strong)>(\s*)/gi,'*'],
          i: [ /(\s*)<(?:i|em)>((?:.|[\r\n])*?)<\/(?:i|em)>(\s*)/gi, '_'],
          del: [ /(\s*)<(?:strike|del)>((?:.|[\r\n])*?)<\/(?:strike|del)>(\s*)/gi, '-'],
          u: [ /(\s*)<(?:u|ins)>((?:.|[\r\n])*?)<\/(?:u|ins)>(\s*)/gi, '+']
        };
        for(i = tags.length; i; i--){
          item = items[tags[i-1]];
          callback(item[0], item[1]);
        }
      }