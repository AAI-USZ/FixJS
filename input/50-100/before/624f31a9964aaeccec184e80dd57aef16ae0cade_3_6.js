function(match, uri, content){
        if(/^\s*![^!]+!\s*$/.test(content)){
          return $.trim(content) + ":" + uri;
        } else {
          return "\"" + content + "\":" + uri;
        }
      }