function(regexp, delimiter){
          items = items.replace(regexp, delimiter + '$1' + delimiter);
        }