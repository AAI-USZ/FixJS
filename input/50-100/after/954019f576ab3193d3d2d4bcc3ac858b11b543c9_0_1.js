function(word, i) {
        if(word.charAt(0) == '/' && word.charAt(word.length-1) == '/'){
          return word.substr(1,word.length-2)
        }
        return word.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }