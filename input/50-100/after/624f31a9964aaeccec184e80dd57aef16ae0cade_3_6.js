function(match, startSpace, uri, content, endSpace){
        var out = startSpace ? ' ' : '';

        if(/^\s*![^!]+!\s*$/.test(content)){
          out += $.trim(content) + ":";
        } else {
          out += "\"" + content + "\":";
        }
        out += uri;
        if(endSpace){
          out += ' ';
        }
        return out;
      }